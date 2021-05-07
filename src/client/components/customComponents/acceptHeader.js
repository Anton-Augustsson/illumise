import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from "../customComponents/customButton";

const AcceptHeader = ({onPress, userName, stars, zIndex = 1, acceptTitle, onButtonPress}) => {
    return(
        <View style={[styles.topContainer, {zIndex:zIndex}]}>
            <TouchableOpacity 
                onPress={onPress}
                style={styles.providerContainer}
            >
                <Text>{userName}</Text>
                <View style={styles.providerStarsContainer}>
                    {
                        [...new Array(stars)].map((_, index) => (
                            <FontAwesome key={index} name="star" size={10} style={styles.star}/>
                        ))
                    }
                </View>
            </TouchableOpacity>
            <CustomButton
                title={acceptTitle}
                style={styles.button}
                styleText={styles.buttonText}
                onPress={onButtonPress}
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
        backgroundColor:"#cccccc",
        borderRadius:10,
    },
    buttonText: {
        color:"black",
    },
    providerContainer: {
        justifyContent:"flex-start",
    },
    providerStarsContainer: {
        flexDirection:"row",
    },
    star: {
        color:"orange",
        marginRight:3,
    }
});
