import React from 'react';
import { View, Image, Text } from "react-native";
import ms from "../mainStyles/ms";

const SplashScreen = () => {
    return (
        <View style={ms.logoContainer}>
            <Image
                style={ms.logoLarge}
                source={require("../../assets/samarit_logo2.png")}
            />
            <Text style={ms.h1}>SAMARIT</Text>
        </View>
    );
}

export default SplashScreen;