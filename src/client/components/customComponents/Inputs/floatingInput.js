import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react';
import {Animated, Easing, View, TextInput, StyleSheet} from 'react-native';
import {colors} from "../../mainStyles/colors"
  
const FloatingInput = forwardRef(({placeholder, onChangeText, onFocus, onBlur, style, ...props}, ref) => {
    const [isFocused, setFocus] = useState(false);
    const [hasText, setHasText] = useState(false); 

    const topValue = useRef(new Animated.Value(0)).current;

    const top = topValue.interpolate({
        inputRange: [0, 1],
        outputRange: [19, 0],
    });

    const animation = (initialValue, toValue) => {
        topValue.setValue(initialValue);
        Animated.timing(topValue, {
            toValue: toValue,
            duration: 150,
            easing: Easing.linear(),
            useNativeDriver:false,
        }).start();
    }

    useImperativeHandle(ref, () => ({
        initState() {
            animation(1, 0);
            setHasText(false);
            setFocus(false);
        }
    }));

    const styles = StyleSheet.create({
        container: {
            marginTop:2,
            paddingTop:8,
            minWidth:135,
        },
        placeholder: {
            position: 'absolute',
            left: 20,
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
            backgroundColor:"white",
        }
    });

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.placeholder,{top: top}]}>
                {placeholder}
            </Animated.Text>
            <TextInput
                {...props}
                style={[styles.textInput,style]}
                onFocus={()=>{
                    setFocus(true); 
                    !hasText ? animation(0, 1) : null;
                    onFocus != null ? onFocus : null;
                }}
                onBlur={()=>{
                    setFocus(false); 
                    !hasText ? animation(1, 0) : null;
                    onFocus != null ? onBlur : null;
                }}
                onChangeText={(text)=>{
                    setHasText(text === "" ? false : true);
                    onChangeText != null ? onChangeText(text) : null;
                }}
            />
        </View>
    );

});

export default FloatingInput;