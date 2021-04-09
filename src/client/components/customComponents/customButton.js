import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
  
const CustomButton = (props) => {
    return (
        <TouchableHighlight style={props.style} onPress={props.onPress}>
            <Text>{props.title}</Text>
        </TouchableHighlight>
    );
}

export default CustomButton;