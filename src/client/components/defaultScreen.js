import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Menu from "./menu/menu"
import HomeScreen from './userScreen/home/home';
import OrdersScreen from './userScreen/orders/orders';
import NotificationScreen from './userScreen/notification/notification';

const Tab = createBottomTabNavigator();

const DefaultScreen = () => {

    //https://reactnavigation.org/docs/bottom-tab-navigator
    return (
        <Tab.Navigator 
            initialRouteName="Home"
            tabBar={props=><Menu {...props}/>}
            >
            <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            />

            <Tab.Screen 
            name="Orders" 
            component={OrdersScreen}
            />

            <Tab.Screen 
            name="Notification" 
            component={NotificationScreen}
            />
        </Tab.Navigator>
    );
}



export default DefaultScreen;