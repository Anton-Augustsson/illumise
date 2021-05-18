import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { Localization } from '../../../../modules/localization';
import { AppContext } from '../../../AppContext';
import Chat from '../../../customComponents/chat';
import request from '../../../../modules/client-communication/request';
import AcceptHeader from '../../../customComponents/acceptHeader';
import account from '../../../../modules/client-communication/account';
import chat from '../../../../modules/client-communication/chat';
import ReviewScreen from "../review/reviewScreen";
import io, { Socket } from "socket.io-client";
import communication from '../../../../modules/client-communication/communication';
import Popup from '../../../customComponents/popup';
import {CommonActions} from "@react-navigation/native";
import Constants from 'expo-constants';

const url = communication.url;
/** @type {Socket} */
let socket;

export const OrderChatScreen = ({navigation, route}) => 
{
    const { getState } = useContext(AppContext);
    const [otherObject, setOther] = useState(route.params.other);
    const [chatObject, setChat] = useState(route.params.chat);
    const [requestObject, setRequest] = useState(route.params.request);
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState(false);
    const [complete, setComplete] = useState(false);
    const ENDPOINT = url;

    useEffect(() => 
    {
        socket = io(ENDPOINT);
        return () => 
        {
            socket.disconnect();
        }
    }, [ENDPOINT]);

    useEffect(() =>
    {
        socket.on('complete', data =>
        {
            if (!complete)
            {
                setComplete(true);
                setPopup(true);
            }
        });

        const init = async () => 
        {
            let tmpChat = chatObject;
            
            if (route.params.isCreator)
            {
                if (requestObject.providerID)
                {
                    tmpChat = await chat.getChat(requestObject._id, requestObject.providerID, true);
                }
                else
                {
                    tmpChat = await chat.getChat(requestObject._id, tmpChat.provider._id, true);
                }
            }
            else
            {
                tmpChat = await chat.getChat(requestObject._id, getState().user._id, true);
            }
            
            
            if (tmpChat)
            {
                socket.emit('join', { senderId: getState().user._id, chatID: tmpChat._id });
                setChat(tmpChat);
                setOther(await account.getFromID(route.params.isCreator
                                                ? tmpChat.provider._id
                                                : tmpChat.requester._id));
                return false;
            }
            else
            {
                Alert.alert("Error When loading request", "Chat does not exist");
                navigation.goBack();
                return true;
            }
        }
        init().then(result => setLoading(result));
    },[]);

    return loading? <></> : (
        <KeyboardAvoidingView 
            behavior="padding" 
            keyboardVerticalOffset={50+Constants.statusBarHeight} 
            style={{flex:1}}
        >
            <Popup
                visible={popup}
                setVisible={setPopup}
                onClose={()=>navigation.goBack()}
                content={
                    <ReviewScreen 
                        data={{ fromID: getState().user._id, 
                                toID: otherObject._id, 
                                requestID: requestObject._id, 
                                toProvider: route.params.isCreator }}
                        nav={navigation}
                        setComplete={setComplete}
                    />
                }
            />

            {route.params.isCreator ? requestObject.providerID === null ?
                <AcceptHeader
                    userObject={{...otherObject, isCreator: route.params.isCreator}}
                    acceptTitle={Localization.getText("acceptProvider")}
                    navigation={navigation}
                    onButtonPress={async () => 
                    {
                        try 
                        {
                            let result = await request.provider.set(requestObject._id, otherObject._id);
                            setRequest(await request.get(requestObject._id));
                            navigation.dispatch(state => {
                                const routes = state.routes.filter(route => route.name !== "OrderApproval");
                                return CommonActions.reset({
                                    ...state,
                                    routes,
                                    index: routes.length - 1,
                                });
                            })
                        }
                        catch(error) 
                        {
                            console.log(error)
                        }
                    }}
                    centerButtonEnabled={true}
                    requestID={requestObject._id}
                />
                :
                <AcceptHeader
                    userObject={{...otherObject, isCreator: route.params.isCreator}}
                    acceptTitle={Localization.getText("completeRequest")}
                    navigation={navigation}
                    onButtonPress={async () => 
                    {
                        let result = await request.completeRequest(requestObject._id);
                        socket.emit('sendComplete', {senderId: getState().user._id, chatID: chatObject._id});
                    }}
                    centerButtonEnabled={true}
                    requestID={requestObject._id}
                />
                :
                <AcceptHeader
                    userObject={{...otherObject, isCreator: route.params.isCreator}}
                    acceptTitle={Localization.getText("cancelRequest")}
                    buttonStyle={{backgroundColor: "#ff4d4d"}}
                    navigation={navigation}
                    onButtonPress={async () => 
                    {
                        if (requestObject.providerID)
                        {
                            let result = await request.provider.set(requestObject._id, null);
                            if (result)
                            {
                                await chat.removeChat(chatObject._id);
                                navigation.goBack();
                            }
                            else
                            {
                                Alert.alert("Error", "Something went wrong");
                            }
                        }
                        else
                        {
                            await chat.removeChat(chatObject._id);
                            navigation.goBack();
                        }
                    }}
                    centerButtonEnabled={true}
                    requestID={requestObject._id}
                />
            }
            <Chat 
                chatObject={chatObject} 
                user={getState().user} 
                other={otherObject} 
                isCreator={route.params.isCreator}
                socket={socket}
            />
        </KeyboardAvoidingView>
    );
}