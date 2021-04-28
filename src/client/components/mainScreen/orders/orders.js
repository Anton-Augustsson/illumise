import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, Settings} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {colors} from "../../mainStyles/colors";
import ms from "../../mainStyles/ms";
import CustomHeader from "../../customComponents/customHeader"
import RequestIcon from "../../customComponents/requestIcon";

import OrderScreen from "./order/order";
import OrderApprovalScreen from "./orderApproval/orderApproval";
import OrderProvidingScreen from "./orderProviding/orderProviding";
import OrderProvidingApprovalScreen from "./orderProvidingApproval/orderProvidingApproval";

function createORDER(id, category, status, type, request, text){
    let result = {
            "id": id,
            "category": category,
            "status": status,
            "type": type,
            "request": request,
            "text": text,
    }
   return result;
}

function generateORDERS(){
    let numOfRequests = 3;
    let result = [];
    let category = "myrequest";
    let status;
    let type;
    let text;
    let request = "json";

    for(let i = 1; i <= numOfRequests; i++){

        // TODO remove
        if(i<=2) status = "approved";
        else status = "unapproved";
        if(i==1) {
            type = "food";
            text = "Banan";
        } else if (i==2) {
            type = "package";
            text = "Apple";
        } else {
            type = "mail";
            text = "Tree";
        }

        result[i-1] = createORDER(i.toString(), category, status, type, request, text);
    }

    return result;
}

function generateORDERSPROVIDING(){
    let numOfRequests = 3;
    let result = [];
    let category = "providing";
    let status;
    let type;
    let text;
    let request = "json";

    for(let i = 1; i <= numOfRequests; i++){

        // TODO remove
        if(i<=2) status = "approved";
        else status = "unapproved";
        if(i==1) {
            type = "food";
            text = "Kingsrow: mat";
        } else if (i==2) {
            type = "package";
            text = "QuensRow: post";
        } else {
            type = "mail";
            text = "Prince Row: lämna post";
        }
        // TODO remove

        result[i-1] = createORDER(i.toString(), category, status, type, request, text);
    }

    return result;
}

const ORDERS = generateORDERS();/*[
    {
        "id":"1",
        "category":"myrequest",
        "status":"approved",
        "type":"food",
        "request":"json",
        "text":"Banan",
    },{
        "id":"2",
        "category":"myrequest",
        "status":"approved",
        "type":"package",
        "request":"json",
        "text":"Apple",
    },{
        "id":"3",
        "category":"myrequest",
        "status":"unapproved",
        "type":"mail",
        "request":"json",
        "text":"Tree",
    }
]*/

const ORDERSPROVIDING = generateORDERSPROVIDING(); /*[
    {
        "id":"1",
        "category":"providing",
        "status":"approved",
        "type":"food",
        "request":"json",
        "text":"Kingsrow: mat",
    },{
        "id":"2",
        "category":"providing",
        "status":"approved",
        "type":"package",
        "request":"json",
        "text":"QuensRow: post",
    },{
        "id":"3",
        "category":"providing",
        "status":"unapproved",
        "type":"mail",
        "request":"json",
        "text":"Prince Row: lämna post",
    }
]*/

const OrderItem = (item, navigation) => {
    return (
        <TouchableOpacity
          onPress={()=>{navigation.navigate(item.category + item.status, { "id":item.id })}}
            style={ms.itemContainer}>
            <RequestIcon type={item.type} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{item.text}</Text>
        </TouchableOpacity>
    );
}

const FirstScreen = ({navigation}) => {
    return (

        <View style={{flex:1}}>
            <CustomHeader 
                title={Localization.getText("myOrders")}
                nav={navigation}
                goBack={false}
            />
          <Text>My requests</Text>
            <FlatList
                data={ORDERS}
                renderItem={({item})=>OrderItem(item, navigation)}
                keyExtractor={(item)=>item.id}
            />
          <Text>Providing</Text>
          <FlatList
                data={ORDERSPROVIDING}
                renderItem={({item})=>OrderItem(item, navigation)}
                keyExtractor={(item)=>item.id}
            />
        </View>
    );
}

const Stack = createStackNavigator();

const OrdersScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                cardStyle:{backgroundColor:colors.DEFAULT_BACKGROUND}
            }}
            initialRouteName="FirstScreen"
        >
            <Stack.Screen
                name="FirstScreen"
                component={FirstScreen}
            />

            <Stack.Screen
                name="myrequestapproved" // item.category + item.status
                component={OrderScreen}
            />

          <Stack.Screen
                name="myrequestunapproved" // item.category + item.status
                component={OrderApprovalScreen}
            />

          <Stack.Screen
                name="providingapproved" // item.category + item.status
                component={OrderProvidingScreen}
            />

          <Stack.Screen
                name="providingunapproved" // item.category + item.status
                component={OrderProvidingApprovalScreen}
            />

        </Stack.Navigator>
    );
}

export default OrderScreen;

