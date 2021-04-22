import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ms from '../mainStyles/ms';
import {Localization} from "../../modules/localization"

const CartButton = (props) => {
    const styles = StyleSheet.create({
        cartItemCounter: {
            position:"absolute",
            color:"white",
            fontWeight:"bold",
            fontSize:15,
            right:props.counter < 10 ? 8 : 0,
            top:0,
            alignSelf:"flex-start",
        }
    });
    return (
        <TouchableOpacity 
            style={[ms.button,{flexDirection:"row"}]}
            onPress={props.onPress}
        >
            <Text style={{color:"white", fontWeight:"bold", fontSize:15, marginRight:5}}>
                {Localization.getText("cart")}
            </Text>
            <View style={{flexDirection:"row",paddingTop:6, paddingBottom:6,paddingRight:19}}>
                <Entypo name="shopping-cart" title={props.title} size={props.size == null ? 22 : props.size} color={props.color == null ? "white" : props.color}/>
                <Text style={styles.cartItemCounter}>{props.counter}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CartButton;