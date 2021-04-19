import React from "react";
import { Ionicons, MaterialCommunityIcons, Entypo, AntDesign} from '@expo/vector-icons';

const BurgarIcons = (props) => {
    var name;
    var icon
    switch (props.type) {
        case "Settings":
            name = "settings";
            icon = Ionicons;
            break;
        case "Profile":
            name = "face-profile"
            icon = MaterialCommunityIcons;
            break;
        case "Faq": 
            name = "help"; 
            icon = Entypo;
            break;
        default:
            name = "unkownfile1";
            icon = AntDesign;
            break;
    }
    const ThisIcon = icon;
    return <ThisIcon name={name} size={props.size} color={props.color}/>
}

export default BurgarIcons;