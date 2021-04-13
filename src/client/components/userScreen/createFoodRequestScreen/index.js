import React, {useState} from 'react';
import { Text, View, Image, TextInput, Button, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomButton from "../../customComponents/customButton";
import CustomHeader from "../../customComponents/customHeader"
import CustomListItem from "../../customComponents/customListItem"
import ms from '../../mainStyles/ms';
import fs from "./foodStyles";

const SHOPPING_LIST = [
    {
        id: "1",
        text:"Arla Mellanmjölk"
    },{
        id: "2",
        text:"Arla Mellanmjölk"
    },{
        id: "3",
        text:"Arla Mellanmjölk"
    },{
        id: "4",
        text:"Arla Mellanmjölk"
    },{
        id: "5",
        text:"Arla Mellanmjölk"
    },{
        id: "6",
        text:"Arla Mellanmjölk"
    },{
        id: "8",
        text:"Arla Mellanmjölk"
    },{
        id: "234",
        text:"Arla Mellanmjölk"
    },{
        id: "523491",
        text:"Arla Mellanmjölk"
    },{
        id: "5231",
        text:"Arla Mellanmjölk"
    },{
        id: "5123",
        text:"Arla Mellanmjölk"
    },{
        id: "5341234",
        text:"Arla Mellanmjölk"
    },{
        id: "53ewifj41234",
        text:"Arla Mellanmjölk"
    },{
        id: "53412ewhfi34",
        text:"banna"
    },{
        id: "5ife19341234",
        text:"Arla Mellanmjölk"
    }
]

const renderItem = ({item}) => {
    return (
        <CustomListItem text={item.text}/>
    );
}

const createFoodRequestScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title="Mat"
                nav={navigation}
            />
            <View style={fs.content}>
                
                <View style={{flex:1}}>
                    <Text>Leverera till:</Text>
                    <TextInput 
                        style={fs.desc}
                        placeholder="Beskrivning"
                        multiline={true}
                    />
                    <Text>Inköpslista:</Text>
                    <FlatList
                        data={SHOPPING_LIST}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />   
                </View>

                <View style={fs.orderContainer}>
                    <CustomButton
                        style={ms.button}
                        title="Slutför beställning"
                    />
                </View>
            </View>
        </View>
    );
}

export default createFoodRequestScreen;