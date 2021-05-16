import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { Localization } from '../../modules/localization';
import SamaritButton from './samaritButton';
  
const Loading = ({title, info, onPress}) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{title ? title : Localization.getText("loading...") }</Text>
                <Text style={styles.info}>{info ? info : null}</Text>
                
            </View>
            {onPress ?
                <SamaritButton
                    title={Localization.getText("goBack")}
                    onPress={onPress}
                />
            : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        fontSize:20,
    },
    info: {
    }
});

export default Loading;
