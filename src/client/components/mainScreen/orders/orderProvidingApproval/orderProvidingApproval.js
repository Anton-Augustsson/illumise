// TODO

import React from 'react';
import { Text, View } from 'react-native';
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
                <Text h2>Request Title</Text>
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
