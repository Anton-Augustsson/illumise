import React from 'react';
import { Text, View, Image} from 'react-native';
import ms from "../../mainStyles/ms"
import hs from "./homeStyle"

const HomeScreen = ({navigation, route}) => {

    //USE route.params.token.access_token to get accesstoken
    return (
        <Text style={
            ms.logoContainer
        }>SHALOM </Text>
    );
}

export default HomeScreen;