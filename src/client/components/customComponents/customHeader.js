import React from 'react';
<<<<<<< HEAD
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {colors} from "../mainStyles/colors";



const CustomHeader = (props) => {
    var goBack =  
        <TouchableOpacity 
            style={styles.goBackContainer}
            onPress={() => props.nav.goBack()}
        >
            <Ionicons name="chevron-back-sharp" size={22} color="white"/>
            <Text style={styles.backTitle}>Gå tillbaka</Text>
        </TouchableOpacity>
    

    if(props.goBack == false) {
        goBack = <></>;
    }

    return (
        <View style={styles.header}>
            {goBack}
            <Text style={styles.headerTitle}>{props.title}</Text>
=======
import {Text, View} from 'react-native';
import CustomButton from "./customButton";
import ms from "../mainStyles/ms";

const CustomHeader = (props) => {
    return (
        <View style={ms.header}>
            <CustomButton
                style={ms.headerBack}
                title="Gå tillbaka"
                onPress={() => props.nav.goBack()}
            />
            <Text style={ms.headerTitle}>{props.title}</Text>
>>>>>>> main
        </View>
    );
}

<<<<<<< HEAD
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

=======
>>>>>>> main
export default CustomHeader;