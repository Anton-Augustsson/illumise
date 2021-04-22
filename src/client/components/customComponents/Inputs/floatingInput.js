import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {colors} from "../../mainStyles/colors"
  
const FloatingInput = ({placeholder, onChangeText, onFocus, onBlur, style, ...props}) => {
    const [isFocused, setFocus] = useState(false);
    const [hasText, setHasText] = useState(false); 
    const styles = StyleSheet.create({
        container: {
            marginTop:2,
            paddingTop:8,
            minWidth:135,
        },
        placeholder: {
            position: 'absolute',
            left: 20,
            top: !hasText && !isFocused ? 19 : 0,
            fontSize: !hasText && !isFocused ? 14 : 12,
            color: !hasText && !isFocused ? '#aaa' : '#000',
            alignSelf:"flex-start",
            backgroundColor: !hasText && !isFocused ? 'transparent' : 'white',
            zIndex:!hasText && !isFocused ? -1 : 100,
            paddingRight:!hasText && !isFocused ? 0 : 3,
            paddingLeft:!hasText && !isFocused ? 0 : 3,
        },
        textInput: {
            paddingLeft:20,
            paddingRight:20,
            paddingTop:5,
            paddingBottom:5,
            borderWidth:2,
            borderStyle:"solid",
            borderColor: !isFocused ? colors.INPUT_BORDER : colors.INPUT_FOCUS,
            borderRadius:20,
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.placeholder}>
                {placeholder}
            </Text>
            <TextInput
                {...props}
                style={[styles.textInput,style]}
                onFocus={()=>{setFocus(true); onFocus != null ? onFocus : null;}}
                onBlur={()=>{setFocus(false); onFocus != null ? onBlur : null;}}
                onChangeText={(text)=>{
                    console.log("hej");
                    setHasText(text === "" ? false : true);
                    onChangeText != null ? onChangeText(text) : null;
                }}
            />
        </View>
    );

}

export default FloatingInput;