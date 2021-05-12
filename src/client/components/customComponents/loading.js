import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { Localization } from '../../modules/localization';
  
const Loading = ({info}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{info === null ? Localization.getText("loading...") : info}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
    }
});

export default Loading;
