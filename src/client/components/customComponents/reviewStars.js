import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ms from "../mainStyles/ms";

const ReviewStars = ({stars, style, size=11, ...props}) =>
{
    const roundOff = Math.round(parseInt(stars));
    const maxStars = 5;

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
            <Text style={{marginLeft: size/4, fontSize:size}}>{(Math.round(stars + Number.EPSILON) * 100)/100}</Text>
        </View>
    );
}


export default ReviewStars;