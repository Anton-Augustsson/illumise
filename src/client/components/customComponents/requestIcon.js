import React from "react";
import { Image } from 'react-native';
import { FontAwesome5, Octicons, MaterialIcons, Entypo, AntDesign, MaterialCommunityIcons, Feather} from '@expo/vector-icons';

const RequestIcon = (props) => {
    var name;
    var icon
    switch (props.type) {
        case "food":
            name = "hamburger";
            icon = FontAwesome5;
            break;
        case "package":
            name = "box"
            icon = FontAwesome5
            break;
        case "post": 
            name = "local-post-office"; 
            icon = MaterialIcons;
            break;
        case "other":
            name = "dots-three-horizontal";
            icon = Entypo;
            break;
        case "shopping":
                name = "shopping-cart";
                icon = Entypo;
            break;
        case "msg":
            name = "message";
            icon = MaterialIcons;
            break;
        default:
            name = "unkownfile1";
            icon = AntDesign;
            break;
    }
    const ThisIcon = icon;
    return <ThisIcon name={name} size={props.size} color={props.color}/>
}

export default RequestIcon;
