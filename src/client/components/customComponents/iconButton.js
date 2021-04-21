import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons';
import ms from '../mainStyles/ms';
import {Localization} from "../../modules/localization"

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
    console.log(props)
    return (
        <TouchableOpacity 
            style={[ms.button,{flexDirection:"row"}]}
            onPress={props.onPress}
        >
            <Text style={{color:"white", fontWeight:"bold", fontSize:15, marginRight:5}}>
                {Localization.getText(props.title == null ? "continue" : props.title)}
            </Text>
            <Icon title={props.title} size={props.size == null ? 22 : props.size} color={props.color == null ? "white" : props.color}/>

        </TouchableOpacity>
    );
}

export default IconButton;