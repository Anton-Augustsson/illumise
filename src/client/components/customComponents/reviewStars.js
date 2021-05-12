import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ms from "../mainStyles/ms";

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
                        key={index.toString()} 
                        name={index < roundOff ?  "star" : "star-o"}
                        size={size} 
                        style={[ms.star, style]}
                        {...props}
                    />
                ))
            }
            <Text style={ms.rating}>{stars}</Text>
        </View>
    );
}


export default ReviewStars;