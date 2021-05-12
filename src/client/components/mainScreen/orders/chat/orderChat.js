import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Localization } from '../../../../modules/localization';
import { AppContext } from '../../../AppContext';
import Chat from '../../../customComponents/chat';
import CustomHeader from '../../../customComponents/customHeader';
import request from '../../../../modules/client-communication/request';
import AcceptHeader from '../../../customComponents/acceptHeader';
import account from '../../../../modules/client-communication/account';
import chat from '../../../../modules/client-communication/chat';
import ReviewScreen from "../review/reviewScreen";
import Popup from '../../../customComponents/popUp';
import io, { Socket } from "socket.io-client";
import communication from '../../../../modules/client-communication/communication';

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
        console.warn(chatObject);
        if (chatObject) socket.emit('join', { senderId: getState().user._id, chatID: chatObject._id });

        return () => 
        {
            socket.disconnect();
        }
    }, [chatObject, ENDPOINT]);

    useEffect(() =>
    {
        socket.on('complete', data =>
        {
            if (!complete)
            {
                console.warn(data);
                setComplete(true);
                setPopup(true);
            }
        });

        const init = async () => 
        {
            let tmpChat = await chat.getChat(requestObject._id, requestObject.creatorID, false);
            setChat(tmpChat);
            setOther(await account.getFromID(route.params.isCreator
                                            ? tmpChat.provider._id
                                            : tmpChat.requester._id));
            setLoading(false);
        }
        init();
    },[]);

    return (
        <View style={{flex:1}}>
            {loading? 
                <></> 
                :
                <Popup
                    content={<ReviewScreen data={{fromID: getState().user._id, 
                                                  toID: otherObject._id, 
                                                  requestID: requestObject._id, 
                                                  toProvider: route.params.isCreator}}
                                           nav={navigation}
                                           setComplete={setComplete}/>}
                    state={popup}
                    setState={setPopup}
                />
            }
            <CustomHeader 
                title = "Chat"
                nav={navigation}
            />
            <View style={{flex:1}}>
                

                {route.params.isCreator ? requestObject.providerID === null ?
                    <AcceptHeader
                        userObject={{...otherObject, getProvider: route.params.isCreator}}
                        acceptTitle={Localization.getText("acceptProvider")}
                        navigation={navigation}
                        onButtonPress={async () => 
                        {
                            let result = await request.provider.set(requestObject._id, otherObject._id);
                            console.log("Set Provider", result);
                            setRequest(await request.get(request._id));
                        }}
                    />
                    :
                    <AcceptHeader
                        userObject={{...otherObject, getProvider: route.params.isCreator}}
                        acceptTitle={Localization.getText("completeRequest")}
                        navigation={navigation}
                        onButtonPress={async () => 
                        {
                            //let result = await request.completeRequest(requestObject._id);
                            //console.log(result);
                            socket.emit('sendComplete', {senderId: getState().user._id, chatID: chatObject._id}, () => 
                            {
                                setPopup(true);
                                setComplete(true);
                            });
                        }}
                    />
                    :
                    <AcceptHeader
                        userObject={{...otherObject, getProvider: route.params.isCreator}}
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
                    />
                }
                {loading?
                    <></>
                    :
                    <Chat 
                        chatObject={chatObject} 
                        user={getState().user} 
                        other={otherObject} 
                        isCreator={route.params.isCreator}
                        complete={complete}
                    />
                }
            </View>
        </View>
    );
}

const ocs = StyleSheet.create({
    
});