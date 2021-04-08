import {StyleSheet} from 'react-native';

const menuBackground = "red";
const borderTopBackground = "black"

const mms = StyleSheet.create({
    menuContainer: {
        height:75,
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"flex-end",
        borderTopWidth: 2,
        borderStyle: "solid",
        borderTopColor: borderTopBackground, 
    },
    menuItemContainer: {
        justifyContent:"center",
        alignItems:"center",
        width:"25%",
        height:"100%",
        backgroundColor: menuBackground,
    },
    menuIconSize: {
        alignSelf:"center",
        width:50,
        height:50,
    }
});

export default mms;