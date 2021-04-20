import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ms from '../mainStyles/ms';
  
const GoogleButton = (props) => {
    return (
        <TouchableOpacity 
            style={
            [ms.loginButton,
            {
                marginBottom:5,
                shadowColor:'#000',
                shadowOffset:{
                    width:0,
                    height:2,
                },
                shadowOpacity:0.25,
                shadowRadius:3.84,
                elevation:5,
                backgroundColor:'#FFFFFF',
            }]}
                onPress={props.onPress}
                disabled={props.disabled}
                title={props.title}>
                <Image
                    source={require("../../assets/btn_google_light_normal.png")} 
                    style={ms.loginButtonIcon}/>
                <Text style={[ms.loginButtonText,{color:"grey"}]}>
                    Logga in med Google
                </Text>
        </TouchableOpacity>
    );
}

export default GoogleButton;