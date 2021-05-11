import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomButton from "../customComponents/customButton";
import ReviewStars from './reviewStars';

const AcceptHeader = ({navigation, userName, stars, zIndex = 1, acceptTitle, 
                       onButtonPress, buttonStyle, buttonDisabled}) => {

    const disabled = buttonDisabled !== undefined ? buttonDisabled : false;
    return(
        <View style={[styles.topContainer, {zIndex:zIndex}]}>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate("SeeReviews");
                }}
                style={styles.providerContainer}
            >
                <Text>{userName}</Text>
                <ReviewStars stars="5"/>
            </TouchableOpacity>
            <CustomButton
                title={acceptTitle}
                style={[disabled ? styles.buttonDisabled : styles.button, buttonStyle]}
                styleText={styles.buttonText}
                onPress={onButtonPress}
                disabled={disabled}
            />
        </View>
    )
}

export default AcceptHeader;

const styles = StyleSheet.create({
    topContainer: {
        height:56,
        backgroundColor: "white",
        shadowColor:"black",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:7,
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        justifyContent:"space-between",
    },
    button: {
        padding:8,
        backgroundColor:"#00CC00",
        borderRadius:10,
    },
    buttonText: {
        color:"black",
    },
    buttonDisabled: {
        padding:8,
        backgroundColor:"#cccccc",
        borderRadius:10,
    },
    providerContainer: {
        justifyContent:"flex-start",
    }
});
