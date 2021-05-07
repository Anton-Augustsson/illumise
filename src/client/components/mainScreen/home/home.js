import React, {useContext, useState, useEffect} from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodRequestScreen from './requests/foodRequestScreen/foodRequest';
import PostRequestScreen from './requests/postRequestScreen/postRequestScreen';
import LegitimationScreen from './requests/postRequestScreen/legitimation';
import ShoppingRequestScreen from "./requests/shoppingRequestScreen/shoppingRequest";
import {colors} from "../../mainStyles/colors"
import ms from "../../mainStyles/ms"
import hs from "./homeStyle"
import ReceiptScreen from "./requests/receipt/receipt";
import RequestIcon from "../../customComponents/requestIcon"
import DeliverScreen from './requests/deliver/deliver';
import { Localization } from '../../../modules/localization';
import OtherRequestScreen from './requests/OtherRequestScreen/otherRequest';
import storage from '../../../modules/localStorage/localStorage';
import MarketItem from '../market/marketItem';
import { AppContext } from '../../AppContext';
import useUser from '../../customComponents/useUser';



const DATA = [
    {
        id: "1",
        title1: Localization.getText("food"),
        title2: Localization.getText("postAndPackage"),
        type1: "food",
        type2: "package",
        des1: "FoodRequest",
        des2: "PostRequest",
    },
    {
        id: "2",
        title1: Localization.getText("shopping"),
        title2: Localization.getText("other"),
        type1: "shopping",
        type2: "other",
        des1: "ShoppingRequest",
        des2: "OtherRequest",
    }
];

const InnerItem = (props)  => 
{
    return(
        <TouchableOpacity 
            onPress={()=> {
                props.nav.navigation.navigate(props.des);
            }} 
            style={hs.innerItemContainer}
        >
            <RequestIcon type={props.type} size={70} color="white"/>
            <Text style={hs.innerItemTitle}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const Item = ({item, nav}) => (
    <View style={hs.itemContainer}> 
        <InnerItem
            type={item.type1}
            des={item.des1}
            nav={nav}
            title={item.title1}
        />
        <InnerItem
            type={item.type2}
            des={item.des2}
            nav={nav}
            title={item.title2}
        />
    </View>
);

const renderItem = ({item}, nav) => 
{ 
    return (
        <Item
            item={item}
            nav={nav}
        />
    );
};

const FirstScreen = ({nav}) => {

    const { getState } = useContext(AppContext);

    return (
        <View style={{flex:1}}>
            
            <Text style={hs.welcome}>{`${Localization.getText("welcome")} ${getState().user.firstName} ${getState().user.lastName}`}</Text>
            <FlatList
                data={DATA}
                renderItem={(item) => renderItem(item, nav)}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}


const Stack = createStackNavigator();

const HomeScreen = () => {
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
                children={(navigation)=><FirstScreen nav={navigation}/>}
            />

            <Stack.Screen 
                name="FoodRequest" 
                component={FoodRequestScreen}
            />

            <Stack.Screen 
                name="ShoppingRequest" 
                component={ShoppingRequestScreen}
            />

            <Stack.Screen 
                name="OtherRequest" 
                component={OtherRequestScreen}
            />

            <Stack.Screen 
                name="Legitimation" 
                component={LegitimationScreen}
            />

            <Stack.Screen 
                name="Deliver" 
                component={DeliverScreen}
            />

            <Stack.Screen
                name="PostRequest"
                component={PostRequestScreen}
            />

            <Stack.Screen 
                name="Receipt" 
                component={ReceiptScreen}
            />
        </Stack.Navigator>
    );
}

export default HomeScreen;
