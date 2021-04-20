import React from "react";
<<<<<<< HEAD
import { FontAwesome5, Octicons, MaterialIcons, Entypo, AntDesign} from '@expo/vector-icons';
=======
import { FontAwesome5, Octicons, MaterialIcons, Entypo} from '@expo/vector-icons';
>>>>>>> main

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
<<<<<<< HEAD
            break;
        case "msg":
            name = "message";
            icon = MaterialIcons;
            break;
        default:
            name = "unkownfile1";
            icon = AntDesign;
            break;
=======
>>>>>>> main
    }
    const ThisIcon = icon;
    return <ThisIcon name={name} size={props.size} color={props.color}/>
}

export default RequestIcon;
