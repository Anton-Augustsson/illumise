// TODO

import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import os from "../order/orderStyle"
import Chat from '../../../customComponents/chat';

const OrderProvidingScreen = ({navigation, route}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
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

            <Chat name={"Anton"} senderId={"1002323123123123123"} room={"1"}></Chat>
        </View>
    );
}

export default OrderProvidingScreen;
