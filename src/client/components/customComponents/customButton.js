import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
  
const CustomButton = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={props.style}>
                <Text>{props.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default CustomButton;