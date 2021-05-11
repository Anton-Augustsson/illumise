import React from "react";
import {View} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const ReviewStars = ({stars, size = 10, style, ...props}) => {
    return (
        <View style={{flexDirection:"row"}}>
            {
            [...new Array(parseInt(stars))].map((_, index) => (
                <FontAwesome 
                    key={index} 
                    name="star" 
                    size={size} 
                    style={[{color:"orange", marginRight:3}, style]}
                    {...props}
                />
            ))
            }
        </View>
    );
}

export default ReviewStars;