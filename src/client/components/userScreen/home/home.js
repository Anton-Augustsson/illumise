import React from 'react';
import { Text, View, Image} from 'react-native';
import ms from "../../mainStyles/ms"
import hs from "./homeStyle"

const HomeScreen = ({navigation, route}) => {
    return (
        <Text style={
            ms.logoContainer
        }>SHALOM {route.params.token.accessToken}</Text>
    );
}

export default HomeScreen;