import React, {useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Localization } from '../../../../modules/localization';
import { AppContext } from '../../../AppContext';
import Chat from '../../../customComponents/chat';
import CustomHeader from '../../../customComponents/customHeader';
import request from '../../../../modules/client-communication/request';
import AcceptHeader from '../../../customComponents/acceptHeader';
import account from '../../../../modules/client-communication/account';
import chat from '../../../../modules/client-communication/chat';

export const OrderChatScreen = ({navigation, route}) => 
{
    const { getState } = useContext(AppContext);
    const [otherObject, setOther] = useState(route.params.other);
    const [chatObject, setChat] = useState(route.params.chat);
    const [requestObject, setRequest] = useState(route.params.request);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const init = async () => 
        {
            let tmpChat = chatObject;
            if (!chatObject)
            {
                tmpChat = await chat.getChat(requestObject._id, requestObject.creatorID, false);
                setChat(tmpChat);
            }
            if (!otherObject)
            {
                if (route.params.isCreator)
                {
                    setOther(await account.getFromID(tmpChat.provider._id));
                }
                else
                {
                    setOther(await account.getFromID(requestObject.creatorID));
                }
            }
            console.log(otherObject);
            setLoading(false);
        }
        init();
    },[]);

    return (
        <View style={{flex:1}}>
            <CustomHeader 
                title = "Chat"
                nav={navigation}
            />
            <View style={{flex:1}}>

                {route.params.isCreator ? requestObject.providerID === null ?
                    <AcceptHeader
                        userObject={otherObject}
                        acceptTitle={Localization.getText("acceptProvider")}
                        navigation={navigation}
                        onButtonPress={async () => 
                        {
                            let result = await request.provider.set(requestObject._id, otherObject._id);
                            console.log(result);
                            setRequest(await request.get(request._id));
                        }}
                    />
                    :
                    <AcceptHeader
                        userObject={otherObject}
                        acceptTitle={Localization.getText("completeRequest")}
                        navigation={navigation}
                        onButtonPress={async () => 
                        {
                            //let result = await request.completeRequest(requestObject._id);
                            //console.log(result);
                            navigation.goBack();
                            // TODO: Go to add review screen
                        }}
                    />
                    :
                    <AcceptHeader
                        userObject={otherObject}
                        buttonStyle={{backgroundColor: "#ff4d4d"}}
                        navigation={navigation}
                        onButtonPress={async () => 
                        {
                            await chat.removeChat(chatObject._id);
                            navigation.goBack();
                        }}
                    />
                }
                {loading?
                    <></>
                    :
                    <Chat chatObject={chatObject} user={getState().user} other={otherObject} isCreator={route.params.isCreator}/>
                }
            </View>
        </View>
    );
}

const ocs = StyleSheet.create({
    
});