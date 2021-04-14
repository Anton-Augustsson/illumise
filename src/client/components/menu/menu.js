import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import mms from "./menuStyle";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

const MenuItem = (props) => {
    return (
        <View style={mms.menuItemContainer}>
            <TouchableHighlight onPress={props.onPress}>
                <Image
                    style={mms.menuIconSize}
                    source={props.source}
                />
            </TouchableHighlight>
        </View>
    );
}

const Menu = (props) => {

    return (
        <View style={mms.menuContainer}>
            <FontAwesome.Button
                onPress={props.navigation.navigate("Home")}
                name="handshake-o" size={70} color="black"
            />

            <FontAwesome.Button
                onPress={props.navigation.navigate("Orders")}
                name="list-ul" size={70} color="black"
                > Orders
            <FontAwesome.Button/>

            <Ionicons.Button
                onPress={props.navigation.navigate("Notification")}
                Ionicons name="ios-notifications" size={70} color="black"
                > Notification
            </Ionicons.Button>

            <Feather.Button
                //TODO change to burgar menu
                onPress={() => props.navigation.navigate("Home")}
                name="menu" size={70} color="black"
            />
        </View>
    );
}

export default Menu;