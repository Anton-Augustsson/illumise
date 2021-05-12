import React, {useState} from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native"
import {colors} from "../mainStyles/colors";

const Overlay = ({onPress, state, setState, zIndex=10, closeOnClick = true}) => {

    return (
        <View style={[styles.overlayOuter,{zIndex:state ? zIndex : -100}]}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.overlayInner, {display: state ? "flex" : "none"}]}
                onPress={()=>{
                    closeOnClick ? setState(false) : null;
                    onPress !== null ? onPress() : null;
                }}
            />
        </View>
    )
}

export default Overlay;

const styles = StyleSheet.create({
    overlayOuter: {
        position:"absolute",
        height:"100%",
        width:"100%",
        top:0,
        right:0,
        left:0,
        bottom:0,
    },
    overlayInner: {
        flex:1,
        backgroundColor:colors.OVERLAY,
    },
});