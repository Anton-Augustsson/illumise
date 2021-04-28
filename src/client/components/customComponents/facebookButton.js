import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import ms from "../mainStyles/ms";
import { Localization } from '../../modules/localization';
  
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
                    {Localization.getText("loginWithFacebook")}
                </Text>
        </TouchableOpacity>
    );
}

export default FacebookButton;