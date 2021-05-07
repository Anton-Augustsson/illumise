import React, {useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Localization } from '../../../../modules/localization';
import { AppContext } from '../../../AppContext';
import { FontAwesome } from '@expo/vector-icons'; 
import Chat from '../../../customComponents/chat';
import CustomButton from '../../../customComponents/customButton';
import CustomHeader from '../../../customComponents/customHeader';
import request from '../../../../modules/client-communication/request';
import AcceptHeader from '../../../customComponents/acceptHeader';

export const OrderChatScreen = ({navigation}) => 
{
    const { getUser } = useContext(AppContext);
    const [state, setState] = useState({user: {firstName: ""}});

    /*
    useEffect(() => {
        
        const init = async () => {
            try 
            {
                setState({user: await getUser()});
                console.log(state.user.firstName);
            } 
            catch(error) 
            {
                console.log(error);
            }
        }
        init();
    },[]);
    */

    return (
        <View style={{flex:1}}>
            <CustomHeader 
                title = "Chat"
                nav={navigation}
            />
            <View style={{flex:1}}>
                <AcceptHeader
                    userName="Linda"
                    acceptTitle={Localization.getText("acceptProvider")}
                    stars={3}
                />
                <Chat name={Localization.getText("me")} senderId={"1"} room={"1"}/>
            </View>
        </View>
    );
}

const ocs = StyleSheet.create({
    
});