import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ms from '../mainStyles/ms';
  
const GoogleButton = (props) => {
    return (
        <TouchableOpacity 
            style={{flexDirection:"row",alignItems:'center',justifyContent:'left', margin:2, backgroundColor:'#FDFDFD',
            width: ms.button.width,
            height: ms.button.height,
            borderRadius: ms.button.borderRadius,
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity:0.25,
            shadowRadius:3.84,
            elevation:5,

        }}
                onPress={props.onPress}
                disabled={props.disabled}
                title={props.title}>
                <Image
                    source={require("../../assets/btn_google_light_normal.png")} style={{
                        width: ms.logoMedium.width,
                        height: ms.logoMedium.height,
                        margin: 5,
                        marginLeft: 10,
                        marginRight: 15,
                    }}/>
                <Text style={{
                    fontSize: ms.h3.fontSize,
                    fontWeight: ms.h3.fontWeight,
                    color: 'grey',
                }
                }>
                    Logga in med Google
                </Text>
        </TouchableOpacity>
    );
}

export default GoogleButton;