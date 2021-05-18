import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {colors} from "../mainStyles/colors";
import { Localization } from "../../modules/localization";

const CustomHeader = ({scene, previous, navigation}) => {
    const { options } = scene.descriptor;

    const title = options.title !== undefined ? options.title : "";

    return (
        <View style={styles.header}>
            {previous ? 
                <TouchableOpacity 
                    style={styles.goBackContainer}
                    onPress={navigation.goBack}
                >
                    <Ionicons name="chevron-back-sharp" size={22} color="white"/>
                    <Text style={styles.backTitle}>{Localization.getText("goBack")}</Text>
                </TouchableOpacity>
            : undefined}
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width:"100%",
        height:50,
        backgroundColor:colors.SAMARIT_GREEN,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight:"bold",
        color: 'white',
    },
    goBackContainer: {
        position:"absolute",
        flexDirection:"row",
        alignItems:"center",
        left:10,
    },
    backTitle: {
        color:"white",
    }
});

export default CustomHeader;