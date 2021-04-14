import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
  
const CustomButton = (props) => {
    return (
        <TouchableHighlight style={props.style} onPress={() =>props.onPress(props.arg1, props.arg2)}>
            <Text style={props.styleText}>{props.title}</Text>
        </TouchableHighlight>
    );
}

export default CustomButton;