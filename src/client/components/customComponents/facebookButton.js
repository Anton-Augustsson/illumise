import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ms from "../mainStyles/ms";
  
const FacebookButton = (props) => {
    return (
        <TouchableOpacity 
            style={{flexDirection:"row",alignItems:'center',justifyContent:'center',backgroundColor: '#4267b2', margin:2, borderRadius:ms.button.borderRadius, width: ms.button.width, height:ms.button.height,}}
                onPress={props.onPress}
                disabled={props.disabled}
                title={props.title}>
                <Image
                    source={require("../../assets/f_logo_RGB-White_58.png")} style={{
                        height: 40,
                        width:40,
                        margin:5,
                        marginLeft:15,
                        marginRight:15
                    }}/>
                <Text style={ms.h3}>
                    Logga in med facebook
                </Text>
        </TouchableOpacity>
    );
}

export default FacebookButton;