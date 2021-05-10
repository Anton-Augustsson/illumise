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

    useEffect(() => {
        
        console.log("Params", route.params);
        const init = async () => 
        {
            if (otherObject === undefined)
            {
                setOther(await account.getFromID(route.params.request.creatorID))
            }
            if (chatObject === undefined)
            {
                setChat(await chat.getChat(route.params.request._id, getState().user._id, !route.params.isCreator));
            }
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

                {route.params.isCreator ? 
                    <AcceptHeader
                        userName={otherObject != undefined ? `${otherObject.firstName} ${otherObject.lastName}` : ""}
                        acceptTitle={Localization.getText("acceptProvider")}
                        stars={5}
                        onButtonPress={async () => 
                        {
                            await request.provider.set(route.params)
                        }}
                    />
                    :
                    <AcceptHeader
                        userName={otherObject != undefined ? `${otherObject.firstName} ${otherObject.lastName}` : ""}
                        acceptTitle={Localization.getText("cancelRequest")}
                        buttonStyle={{backgroundColor: "#ff4d4d"}}
                        stars={5}
                        onButtonPress={async () => 
                        {
                            await chat.removeChat(chatObject._id);
                            navigation.goBack();
                        }}
                    />
                }
                <Chat name={Localization.getText("me")} senderId={"1"} room={"1"}/>
            </View>
        </View>
    );
}

const ocs = StyleSheet.create({
    
});