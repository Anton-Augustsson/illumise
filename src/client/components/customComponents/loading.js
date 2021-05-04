import React from 'react';
import {Text, StyleSheet, View, Animated, Easing} from 'react-native';
import { Localization } from '../../modules/localization';
  
const Loading = ({info}) => {
    /*
    const animationValue = useRef(new Animated.Value(0)).current;

    const top = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const animation = () => {
        Animated.timing(animationValue, {
            toValue: toValue,
            duration: 150,
            easing: Easing.linear(),
            useNativeDriver:false,
        }).start();
    }
    */

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{info === null ? Localization.getText("loading...") : info}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
    }
});

export default Loading;