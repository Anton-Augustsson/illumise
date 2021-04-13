import {StyleSheet} from 'react-native';
import {colors} from "../../mainStyles/colors"


const fs = StyleSheet.create({
    content: {
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:5,
        paddingTop:5,
    },
    desc: {
        minHeight:100,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderWidth:2,
        borderStyle:"solid",
        borderColor:colors.INPUT_BORDER,
        borderRadius:10,
        textAlignVertical: "top",
    },
    orderContainer: {
        marginTop:5,
    }
});

export default fs;