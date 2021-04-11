import React from 'react';
import { Text, View, Image} from 'react-native';
import ms from "../../mainStyles/ms"
import hs from "./homeStyle"

const HomeScreen = ({navigation, route}) => {

    return (        
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text  style={{
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: ms.h3.fontSize,
                fontWeight: ms.h3.fontWeight,
            }}>Welcome {route.params.user.name}</Text>
        </View>
    );
}

export default HomeScreen;