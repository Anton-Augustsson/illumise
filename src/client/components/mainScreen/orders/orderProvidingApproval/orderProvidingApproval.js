// TODO

import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import os from "../order/orderStyle"
const OrderProvidingApprovalScreen = ({navigation, route}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={route.params.id}
                nav={navigation}
            />
            <View> 
                <h1>Request title</h1>
                <Text>Location: DummyLocation</Text>
                <Text>Person: DummyPerson</Text>
                <View style = {os.descriptionContainer}>
                    <Text style = {os.descriptionText}>Description of request</Text>
                </View>        
            </View>
            
        </View>
    );
}

export default OrderProvidingApprovalScreen;
