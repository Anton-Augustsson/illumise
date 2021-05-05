import {StyleSheet} from 'react-native';
import {magicValues} from "../../mainStyles/magicValues";
import {colors} from "../../mainStyles/colors";

const mms = StyleSheet.create({
    menuContainer: {
        height:magicValues.MENU_HEIGHT-1,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:"5%",
        paddingRight:"5%",
        borderTopWidth: magicValues.MENU_HEIGHT-60,
        borderStyle: "solid",
        borderTopColor: colors.MENU_BORDER, 
        backgroundColor: colors.MENU_BACKGROUND,
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