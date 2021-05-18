import React from 'react';
import {View} from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import {Localization} from "../../modules/localization"
import SamaritButton from './samaritButton';

const Icon = (props) => {
    var name;
    var icon
    switch (props.title) {
        case "cart":
            name = "shopping-cart";
            icon = Entypo;
            break;
        default:
            name = "arrow-right";
            icon = Feather;
            break;
    }
    const ThisIcon = icon;
    return <ThisIcon name={name} size={props.size} color={props.color}/>
}
                
const IconButton = (props) => {
    return (
        <SamaritButton
            styleTitle={{marginRight:5}}
            title={props.title == null ? Localization.getText("continue") : props.title}
            onPress={props.onPress}
            rightContent={
                <View style={{paddingTop:6, paddingBottom:6,paddingRight:20}}>
                    <Icon title={props.title} size={props.size == null ? 22 : props.size} color={props.color == null ? "white" : props.color}/>
                    {props.component == null ? null : 
                        props.component 
                    }
                </View>
            }
        />
    );
}

export default IconButton;