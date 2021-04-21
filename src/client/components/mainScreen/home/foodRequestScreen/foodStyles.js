import {StyleSheet} from 'react-native';
import {colors} from "../../../mainStyles/colors"


const fs = StyleSheet.create({
    content: {
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:5,
        paddingTop:5,
    },
    desc: {
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderWidth:2,
        borderStyle:"solid",
        borderColor:colors.INPUT_BORDER,
        borderRadius:10,
        textAlignVertical: "top",
        marginTop:5,
        marginBottom:5,
    },
    orderContainer: {
        marginTop:5,
    },
    bsContentContainer: {
        backgroundColor:"red",
        height:300,
    },
    bsHeaderContainer: {
        backgroundColor:"red",
        height:20,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        shadowColor: "#333333",
        shadowOffset: {width:-1, height:-3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        //elevation:1,
    },
    bsDrawIndicator: {
        backgroundColor:"grey",
        width:50,
        height:6,
        borderRadius:3,
    }
});

export default fs;