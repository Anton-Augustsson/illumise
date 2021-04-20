import React from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import CustomButton from '../../../customComponents/customButton';
import ms from "../../../mainStyles/ms"
import {colors} from "../../../mainStyles/colors"
import { FlatList } from 'react-native-gesture-handler';

const SuperReceipt = ({params}) => {
    return (
        <View style={rs.container}>
            <Text style={ms.h4}>Address</Text>
            <Text>{params.delivAddress}</Text>

            <Text style={ms.h4}>Varor</Text>
            <FlatList
                data={params.shoppingList}
                renderItem={({item})=><Text>{item.text}</Text>}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}


const rs = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white",
        shadowColor:"#cccccc",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:6,
        margin:20,
        borderRadius:20,
        padding:20,
    }
}); 

const FoodRequestDoneScreen = ({navigation, route}) => {
    //VI KAN FÅ UT INFO GENOM route.params.delivAddress
    return (
        <View style={{flex:1}}>
            <SuperReceipt params={route.params}/>
            <CustomButton
                style={[ms.button, {marginBottom:20,marginLeft:20,marginRight:20}]}
                title="Kolla dina ordrar"
                onPress={() => navigation.navigate("Orders")}
            />
        </View>
    );
}

export default FoodRequestDoneScreen;