import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import mms from "./menuStyle";

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
            <MenuItem 
                onPress={() => props.navigation.navigate("Home")}
                source={require("../../assets/samarit_logo2.png")}
            />
            <MenuItem 
                onPress={() => props.navigation.navigate("Orders")}
                source={require("../../assets/samarit_logo2.png")}
            />
            <MenuItem 
                onPress={() => props.navigation.navigate("Notification")}
                source={require("../../assets/samarit_logo2.png")}
            />
            <MenuItem 
                //TODO change to burgar menu
                onPress={() => props.navigation.navigate("Home")}
                source={require("../../assets/samarit_logo2.png")}
            />
        </View>
    );
}

export default Menu;