import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { Localization } from '../../modules/localization';
import ms from '../mainStyles/ms';
  
const Loading = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{Localization.getText("loading...")}</Text>
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