import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
  
const GoogleButton = (props) => {
    return (
        <TouchableOpacity 
            style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}
                onPress={props.onPress}
                disabled={props.disabled}
                title={props.title}>
                <Image
                    source={require("../../assets/btn_google_signin_light.png")} style={props.style}/>
                    
        </TouchableOpacity>
    );
}

export default GoogleButton;