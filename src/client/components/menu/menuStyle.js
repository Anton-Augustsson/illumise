import {StyleSheet} from 'react-native';

const menuBackground = "red";
const borderTopBackground = "black"

const mms = StyleSheet.create({
    menuContainer: {
        height:75,
        flexDirection:"row",
        justifyContent:"space-evenly",
        borderTopWidth: 2,
        borderStyle: "solid",
        borderTopColor: borderTopBackground, 
        backgroundColor: menuBackground,
    },
    menuItemContainer: {
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
    },
    menuIconSize: {
        alignSelf:"center",
        width:65,
        height:65,
    }
});

export default mms;