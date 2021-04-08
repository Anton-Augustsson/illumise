import React from 'react';
import { Text, View, Image} from 'react-native';
import mms from "./menuStyle";

const MenuItem = (props) => {
    return (
        <View style={mms.menuItemContainer}>
            <Image
                style={mms.menuIconSize}
                source={props.source}
            />
        </View>
    );
}

const Menu = () => {
    return (
        <View style={mms.menuContainer}>
            <MenuItem source={require("../../assets/samarit_logo2.png")}/>
            <MenuItem source={require("../../assets/samarit_logo2.png")}/>
            <MenuItem source={require("../../assets/samarit_logo2.png")}/>
            <MenuItem source={require("../../assets/samarit_logo2.png")}/>
        </View>
    );
}

export default Menu;