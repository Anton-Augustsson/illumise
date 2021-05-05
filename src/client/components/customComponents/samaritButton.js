import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from "../mainStyles/colors";

const SamaritButton = ({onPress, title, rightContent, style, styleTitle}) => {
    return (
        <TouchableOpacity 
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Text style={[styles.title, styleTitle]}>
                {title}
            </Text>
            {rightContent}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        minWidth:150,
        height:50,
        borderRadius:15,
        backgroundColor:colors.SAMARIT_GREEN,
    },
    title: {
        fontSize:15,
        fontWeight:"bold",
        color:"white",
    }
});

export default SamaritButton;