import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from "./menu/menu"
import HomeScreen from './home/home';
import MyOrders from './orders/myOrders';
import NotificationScreen from './notification/notification';
import BurgarScreen from './burgar/burgar';
import MarketScreen from './market/market';

const Tab = createBottomTabNavigator();

const MainScreen = (navigation) => {
    //https://reactnavigation.org/docs/bottom-tab-navigator
    return (
        <Tab.Navigator initialRouteName="Home"
                       tabBar={props=><Menu {...props}/>}>

            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
            />

            <Tab.Screen 
                name="Orders" 
                component={MyOrders}
            />

            <Tab.Screen 
            name="Market" 
            component={MarketScreen}
            />

            <Tab.Screen 
            name="Notification" 
            component={NotificationScreen}
            />

            <Tab.Screen 
                name="Burgar" 
                component={BurgarScreen}
            />
        </Tab.Navigator>
    );
}

export default MainScreen;