import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
  
const CustomButton = (props) => {
    return (
        <TouchableOpacity style={props.style} onPress={() =>props.onPress(props.arg1, props.arg2)}>
            <Text style={[{color:"white"},props.styleText]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;