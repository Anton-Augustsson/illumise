import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ms from "../mainStyles/ms";
  
const FacebookButton = (props) => {
    return (
        <TouchableOpacity 
            style={[ms.loginButton,{backgroundColor: '#4267b2'}]}
        
                onPress={props.onPress}
                disabled={props.disabled}
                title={props.title}>
                <Image
                    source={require("../../assets/f_logo_RGB-White_58.png")} 
                    style={ms.loginButtonIcon}/>
                <Text style={[ms.loginButtonText, {color:"white"}]}>
                    Logga in med facebook
                </Text>
        </TouchableOpacity>
    );
}

export default FacebookButton;