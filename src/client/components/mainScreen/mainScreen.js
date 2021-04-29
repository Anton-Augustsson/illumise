import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from "./menu/menu"
import HomeScreen from './home/home';
import NotificationScreen from './notification/notification';
import BurgarScreen from './burgar/burgar';
import OrderScreen from './orders/orders';

const Tab = createBottomTabNavigator();

const MainScreen = ({navigation, route}) => {
    //https://reactnavigation.org/docs/bottom-tab-navigator
    return (
        <Tab.Navigator initialRouteName="Home"
                       tabBar={props=><Menu {...props}/>}>

            <Tab.Screen 
                name="Home" 
                children={()=><HomeScreen user={route.params.user}/>}
            />

            <Tab.Screen 
                name="Orders" 
                component={OrderScreen}
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