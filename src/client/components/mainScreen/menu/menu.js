import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import mms from "./menuStyle";
import {colors} from "../../mainStyles/colors";
import { FontAwesome, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const MenuIcon = ({des, name, ...props}) => {
    var name;
    var icon
    switch (des) {
        case "Home":
            name = "handshake-o";
            icon = FontAwesome;
            break;
        case "Orders":
            name = "clipboard-list";
            icon = FontAwesome5
            break;
        case "Market": 
            name="shopping"
            icon = MaterialCommunityIcons;
            break;
        case "Notification":
            name = "ios-notifications";
            icon = Ionicons;
            break;
        case "Burgar":
                name = "menu";
                icon = Ionicons;
            break;
    }
    const ThisIcon = icon;
    return <ThisIcon name={name} {...props}/>
} 

const Menu = ({state, navigation}) => {
    return (
        <View style={mms.menuContainer}>
            {
                state.routes.map((item, index) => {

                    const focused = state.index === index;
                    return (
                        <View key={index} style={mms.menuItemContainer}>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate(item.name)}
                            >
                                <MenuIcon
                                    des={item.name}
                                    size={40}
                                    color={focused ? colors.SAMARIT_GREEN : colors.MENU_ICON}
                                    backgroundColor="white"
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })
           }
        </View>
    );
}

export default Menu;