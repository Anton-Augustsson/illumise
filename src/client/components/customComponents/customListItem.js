import React, {useState} from 'react';
import { Text, View, Image, TextInput, Button, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomListItem = (props) => {
    return(
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>
                    {props.text}
                </Text>
                <Ionicons name="close-circle-sharp" size={30} color="red" onPress={() =>{
                    console.log("Hej ANTOOON");
                }}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem:{
        backgroundColor: 'lightgrey',
        padding: 2,
        borderRadius: 10,
        margin: 5,
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
    },
    listItemText:{
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default CustomListItem;