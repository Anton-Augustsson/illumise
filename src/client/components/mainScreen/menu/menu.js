import React, {useState} from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import mms from "./menuStyle";
import {colors} from "../../mainStyles/colors";
import {Feather, FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const Menu = (props) => {
    const [colorOrders, setColorOrders] = useState(colors.MENU_ICON);
    const [colorHome, setColorHome] = useState(colors.MENU_ICON);
    const [colorMarket, setColorMarket] = useState(colors.MENU_ICON);
    const [colorNotification, setColorNotification] = useState(colors.MENU_ICON);
    const [colorBurgar, setColorBurgar] = useState(colors.MENU_ICON);
    return (
        <SafeAreaView>
        <View style={mms.menuContainer}>
            <View style={mms.menuItemContainer}>
                <TouchableOpacity onPress={
                        () => {
                            setColorNotification(colors.MENU_ICON);
                            setColorBurgar(colors.MENU_ICON);
                            setColorMarket(colors.MENU_ICON);
                            setColorHome(colors.SAMARIT_GREEN);
                            setColorOrders(colors.MENU_ICON);
                            props.navigation.navigate("Home"); 
                        }}>
                    <FontAwesome
                        name="handshake-o"
                        size={40}
                        color={colorHome}
                        backgroundColor="white"
                        
                    />
                </TouchableOpacity>
            </View>

            <View style={mms.menuItemContainer}>
                <TouchableOpacity onPress={
                        () => {
                            setColorNotification(colors.MENU_ICON);
                            setColorBurgar(colors.MENU_ICON);
                            setColorMarket(colors.MENU_ICON);
                            setColorHome(colors.MENU_ICON);
                            setColorOrders(colors.SAMARIT_GREEN);
                            props.navigation.navigate("Orders"); 
                        }}>
                    <FontAwesome5
                        name="clipboard-list"
                        size={40}
                        color={colorOrders}
                        backgroundColor="white"
                        
                    />
                </TouchableOpacity>
            </View>
            <View style={mms.menuItemContainer}>
                <TouchableOpacity onPress={
                        () => {
                            setColorNotification(colors.MENU_ICON);
                            setColorBurgar(colors.MENU_ICON);
                            setColorMarket(colors.SAMARIT_GREEN);
                            setColorHome(colors.MENU_ICON);
                            setColorOrders(colors.MENU_ICON);
                            props.navigation.navigate("Market"); 
                        }}>
                    <MaterialCommunityIcons 
                        name="shopping"
                        size={40}
                        color={colorMarket}
                        backgroundColor="white"
                        
                    />
                </TouchableOpacity>
            </View>

            <View style={mms.menuItemContainer}>
                <TouchableOpacity onPress={
                        () => {
                            setColorNotification(colors.SAMARIT_GREEN);
                            setColorBurgar(colors.MENU_ICON);
                            setColorMarket(colors.MENU_ICON);
                            setColorHome(colors.MENU_ICON);
                            setColorOrders(colors.MENU_ICON);
                            props.navigation.navigate("Notification"); 
                        }}>
                    <Ionicons
                        name="ios-notifications"
                        size={40}
                        color={colorNotification}
                        backgroundColor="white"
                        
                    />
                </TouchableOpacity>
            </View>

            <View style={mms.menuItemContainer}>
                <TouchableOpacity onPress={
                        () => {
                            setColorNotification(colors.MENU_ICON);
                            setColorBurgar(colors.SAMARIT_GREEN);
                            setColorMarket(colors.MENU_ICON);
                            setColorHome(colors.MENU_ICON);
                            setColorOrders(colors.MENU_ICON);
                            props.navigation.navigate("Burgar"); 
                        }}>
                    <Ionicons
                        name="menu"
                        size={40}
                        color={colorBurgar}
                        backgroundColor="white"
                        
                    />
                </TouchableOpacity>
            </View>

            
        </View>
        </SafeAreaView>
    );
}

export default Menu;