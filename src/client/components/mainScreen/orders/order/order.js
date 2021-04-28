// TODO

import React, {useState} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import os from "./orderStyle";
import ChatView from '../../../customComponents/chatView';
const OrderScreen = ({navigation, route}) => {
    //setChat(CHAT);
    
    return (
        <View style={{flex:1}}>
            <CustomHeader
              title={route.params.id}
                nav={navigation}
            ></CustomHeader>
            <View> 
                <Text>Request title</Text>
                <Text>Location: DummyLocation</Text>
                <Text>Person: DummyPerson</Text>
                <View style = {os.descriptionContainer}>
                    <Text style = {os.descriptionText}>Description of request</Text>
                </View>        
            </View>
            <ChatView></ChatView>
          
        </View>
    );
}




export default OrderScreen;

