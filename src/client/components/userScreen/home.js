import React from 'react';
import { Text, View, Image} from 'react-native';
import ms from "../mainStyles/ms"
import hs from "./styles"
import Menu from "../menu/menu"

const HomeContent = () => {
    return( 
        <View style={hs.contentContainer}>

        </View>
    );
}
  
const HomeScreen = ({navigation}) => {
    return (
        <View style={hs.container}>
            <HomeContent/>
            <Menu/>
        </View>
    );
    
}

export default HomeScreen;