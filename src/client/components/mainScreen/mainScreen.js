import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from "./menu/menu"
import HomeScreen from './home/home';
import NotificationScreen from './notification/notification';
import BurgarScreen from './burgar/burgar';
import MarketScreen from './market/market';
import OrderScreen from './orders/orders';

const Tab = createBottomTabNavigator();

class MainScreen extends React.Component
{
    render()
    {
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
                    component={OrderScreen}
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
}

export default MainScreen;
