import React, {useState} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import Chat from '../../../customComponents/chat';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import os from "./orderStyle";

/**<View> 
                <Text>Request title</Text>
                <Text>Location: DummyLocation</Text>
                <Text>Person: DummyPerson</Text>
                <View style = {os.descriptionContainer}>
                    <Text style = {os.descriptionText}>Description of request</Text>
                </View>        
            </View> */
const OrderScreen = ({navigation, route}) => {
    //setChat(CHAT);
    return (
        <View style={{flex:1}}>
            <CustomHeader
                nav={navigation}
            ></CustomHeader>

            <Chat/>
        </View>
    );
}

export default OrderScreen;

