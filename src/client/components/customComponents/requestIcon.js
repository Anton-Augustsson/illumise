import React from "react";
import { FontAwesome5, Octicons, MaterialIcons, Entypo} from '@expo/vector-icons';

const RequestIcon = (props) => {
    var name;
    var icon
    switch (props.type) {
        case "food":
            name = "hamburger";
            icon = FontAwesome5;
            break;
        case "package":
            name = "package"
            icon = Octicons;
            break;
        case "mail": 
            name = "local-post-office"; 
            icon = MaterialIcons;
            break;
        case "other":
            name = "dots-three-horizontal";
            icon = Entypo;
            break;
        case "msg":
            name = "message";
            icon = MaterialIcons;
            break;
        default:
            return null;
            break;
    }
    const ThisIcon = icon;
    return <ThisIcon name={name} size={props.size} color={props.color}/>
}

export default RequestIcon;
