import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const ReviewStars = ({stars, style, ...props}) =>
{
    const roundOff = Math.round(parseInt(stars));
    const maxStars = 5;
    const size = 11;

    return (
        <View style={{flexDirection:"row", alignItems:"center"}}>
            {
            [...new Array(maxStars)].map((_, index) => (
                <FontAwesome 
                    key={index} 
                    name={index < roundOff ?  "star" : "star-o"}
                    size={size} 
                    style={[styles.star, style]}
                    {...props}
                />
            ))}
            <Text style={styles.rating}>{stars}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    star: {
        color:"orange", 
        marginRight:3
    },
    rating: {
        fontSize:11, 
        marginLeft:2
    }
})

export default ReviewStars;