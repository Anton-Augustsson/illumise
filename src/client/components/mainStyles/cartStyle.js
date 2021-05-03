import {StyleSheet} from "react-native";

const cs = StyleSheet.create({
    listItemContainer:{
        backgroundColor: 'white',
        shadowColor:"#cccccc",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:4,
        borderRadius: 10,
        padding:8,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
    },
    listItemView:{ 
        flexDirection: 'row',
        alignItems:"center",
        justifyContent: 'space-between',
    },
    listItemInfo: {
        borderTopWidth:0.5,
        marginRight:5,
        marginBottom:5,
        paddingTop:5,
        marginTop:7,
    },
    listItemText:{
        width:"80%",
        fontSize: 20,
        fontWeight: 'bold',
    },
    otherInfo: {
        paddingTop:5,
        minHeight:75,
        paddingBottom:10,
    },
    quantity: {
        fontSize:17,
        fontWeight:"bold",
    },
    changeQuantity: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
    },
    changeQuantityText: {
        marginRight:10,
    },
    margin: {
        marginLeft:5,
    }
})

export default cs;