// TODO

import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import os from "../order/orderStyle"
const OrderProvidingScreen = ({navigation, route}) => {
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

            <View> 
                <Text>Chat window</Text>
            </View>
            
        </View>
    );
}

export default OrderProvidingScreen;
