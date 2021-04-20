import { StatusBar } from 'expo-status-bar';
import React from 'react';
<<<<<<< HEAD
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomHeader from './customHeader';
=======
import {View, Text, TouchableOpacity} from 'react-native';
>>>>>>> main
  
const CustomButton = (props) => {
    return (
        <TouchableOpacity style={props.style} onPress={() =>props.onPress(props.arg1, props.arg2)}>
            <Text style={[props.styleText, {color:"white"}]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;