import {StyleSheet} from 'react-native';
<<<<<<< HEAD:src/client/components/mainScreen/menu/menuStyle.js
import {colors} from "../../mainStyles/colors"
=======
import {colors} from "../mainStyles/colors"
>>>>>>> main:src/client/components/menu/menuStyle.js

const menuBackground = "white";
const borderTopBackground = "black"

const mms = StyleSheet.create({
    menuContainer: {
        height:60,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:"5%",
        paddingRight:"5%",
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: borderTopBackground, 
        backgroundColor: menuBackground,
    },
    menuItemContainer: {
        justifyContent:"center",
        alignItems:"center",
        width:60,
    },
    menuIcon: {
    },
});

export default mms;