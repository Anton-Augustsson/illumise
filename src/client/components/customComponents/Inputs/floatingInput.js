import React, {forwardRef, useImperativeHandle, useState, useRef, useEffect} from 'react';
import {Animated, Easing, View, TextInput, StyleSheet} from 'react-native';
import {colors} from "../../mainStyles/colors"
  
const FloatingInput = forwardRef(({placeholder, onChangeText, 
                    onFocus, onBlur, style, multiline = false, value, maxHeight = 100, ...props}, ref) => {
    const [isFocused, setFocus] = useState(false);
    const [hasText, setHasText] = useState(value); 

    const topValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    const top = topValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["45%", "0%"],
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
        input: {
            borderWidth:2,
            borderStyle:"solid",
            borderColor: !isFocused ? colors.INPUT_BORDER : colors.INPUT_FOCUS,
            borderRadius:20,
        },
        oneLine: {
            paddingLeft:20,
            paddingRight:20,
            paddingTop:5,
            paddingBottom:5,
        },
        multiLine: {
            minHeight:100,
            maxHeight:maxHeight,
            paddingTop:10,
            paddingBottom:10,
            paddingLeft:20,
            paddingRight:20,
            textAlignVertical:"top"
        }
    });
    
    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.placeholder,{top: top}]}>
                {placeholder}
            </Animated.Text>
            <TextInput
                {...props}
                value={value}
                multiline={multiline}
                style={[styles.input, multiline ? styles.multiLine : styles.oneLine, style]}
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
                    setHasText(text !== "");
                    onChangeText != null ? onChangeText(text) : null;
                }}
            />
        </View>
    );

});

export default FloatingInput;