import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from "./menu/menu"
import HomeScreen from './home/home';
import OrdersScreen from './orders/orders';
import NotificationScreen from './notification/notification';
import BurgarScreen from './burgar/burgar';

const Tab = createBottomTabNavigator();

<<<<<<< HEAD:src/client/components/mainScreen/mainScreen.js
const MainScreen = ({navigation, route}) => {
=======
const DefaultScreen = ({navigation, route}) => {
>>>>>>> main:src/client/components/defaultScreen.js
    //https://reactnavigation.org/docs/bottom-tab-navigator
    return (
        <Tab.Navigator 
            initialRouteName="Home"
            tabBar={props=><Menu {...props}/>}
            >
            <Tab.Screen 
            name="Home" 
            children={()=><HomeScreen user={route.params.user}/>}
            />

            <Tab.Screen 
            name="Orders" 
            component={OrdersScreen}
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