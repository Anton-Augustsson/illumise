import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Animated, Easing, View, Text, TouchableOpacity,
        StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ms from '../mainStyles/ms';
import {Localization} from "../../modules/localization"



const CartButton = forwardRef((props, ref) => {
    const AnimatedEntypo = Animated.createAnimatedComponent(Entypo);
    const cartSize = useRef(new Animated.Value(0)).current;

    const iconSize = cartSize.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
        outputRange: [1, 1.125, 1.25, 1.25, 1.125, 1],
    });

    useImperativeHandle(ref, () => ({
        animation () {
            cartSize.setValue(0);
            Animated.timing(cartSize, {
                toValue: 1,
                duration: 900,
                easing: Easing.elastic(),
                useNativeDriver:true,
            }).start();
        }
    }));
    

    const styles = StyleSheet.create({
        cartItemCounter: {
            position:"absolute",
            color:"white",
            fontWeight:"bold",
            fontSize:15,
            right:props.counter < 10 ? 8 : 0,
            top:0,
            alignSelf:"flex-start",
        },
        cartImgContainer: {
            flexDirection:"row",
            paddingTop:6, 
            paddingBottom:6,
            paddingRight:19,
        },
        cartText: {
            color:"white", 
            fontWeight:"bold", 
            fontSize:15, 
            marginRight:5,
        },
        icon: {
            transform:[
                {scale:iconSize}
            ]
        }
    });

    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <Animated.View
                style={[ms.button, {flexDirection:"row"}]}
            >
                <Text style={styles.cartText}>
                    {Localization.getText("cart")}
                </Text>
                <View style={styles.cartImgContainer}>
                    <AnimatedEntypo
                        name="shopping-cart" 
                        title={props.title} 
                        size={props.size != null ? props.size : 22} 
                        color={props.color == null ? "white" : props.color}
                        style={styles.icon}
                    />
                    <Text style={styles.cartItemCounter}>{props.counter}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
});

export default CartButton;