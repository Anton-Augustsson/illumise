import React, {useState} from 'react';
import { Text, View, Image, TextInput, Button, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import CustomButton from "../../customComponents/customButton";
import CustomHeader from "../../customComponents/customHeader"
import CustomListItem from "../../customComponents/customListItem"
import ms from '../../mainStyles/ms';
import fs from "./foodStyles";


const createFoodRequestScreen = ({navigation}) => {
    return (
        <>
            <CustomHeader
                title="Mat"
                nav={navigation}
            />
            <View style={fs.container}>
                
                <Text>Leverera till:</Text>
                <TextInput 
                    style={fs.desc}
                    placeholder="Beskrivning"
                    multiline={true}
                />
                <Text>Inköpslista:</Text>
                <CustomListItem text="Arla Mellanmjölk"/>

                <CustomButton
                    style={ms.button}
                    title="Slutför beställning"
                />
            </View>
        </>
    );
}



export default createFoodRequestScreen;