import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text} from 'react-native';
  
const CustomButton = (text, style, pressFunc) => {
    return (
        <TouchableHighlight onPress={pressFunc}>
            <View style={style}>
                <Text>{text}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default CustomButton;