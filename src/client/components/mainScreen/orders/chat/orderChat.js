import React, {useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Localization } from '../../../../modules/localization';
import { AppContext } from '../../../AppContext';
import { FontAwesome } from '@expo/vector-icons'; 
import Chat from '../../../customComponents/chat';
import CustomButton from '../../../customComponents/customButton';
import CustomHeader from '../../../customComponents/customHeader';
import request from '../../../../modules/client-communication/request';

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
                <View style={ocs.topContainer}>
                    <TouchableOpacity 
                        onPress={async () => {
                            //TODO add ids
                            await request.requester.acceptProvider();
                            navigation.navigate("");
                        }}
                        style={ocs.providerContainer}
                    >
                        <Text>FintNamn</Text>
                        <View style={ocs.providerStarsContainer}>
                            {
                                [...new Array(2)].map((_, index) => (
                                    <FontAwesome key={index} name="star" size={10} style={ocs.star}/>
                                ))
                            }
                        </View>
                    </TouchableOpacity>
                    <CustomButton
                        title={Localization.getText("acceptProvider")}
                        style={ocs.button}
                        styleText={ocs.buttonText}
                    />
                </View>
                <Chat name={Localization.getText("me")} senderId={"1"} room={"1"}/>
            </View>
        </View>
    );
}

const ocs = StyleSheet.create({
    topContainer: {
        backgroundColor: "white",
        shadowColor:"black",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:7,
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        justifyContent:"space-between",
    },
    button: {
        padding:8,
        backgroundColor:"#cccccc",
        borderRadius:10,
    },
    buttonText: {
        color:"black",
    },
    providerContainer: {
        justifyContent:"flex-start",
    },
    providerStarsContainer: {
        flexDirection:"row",
    },
    star: {
        color:"orange",
        marginRight:3,
    }
});