import {StyleSheet} from 'react-native';
import {colors} from "../../mainStyles/colors"

const itemContainerBackground = "#069547"

const hs = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    contentContainer: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal:20,
    },
    itemContainer: {
        flexDirection:"row", 
        justifyContent:"space-evenly",
        marginTop:"5%",
    },
    innerItemContainer: {
        width:"40%",
        height:150,
        backgroundColor: colors.SAMARIT_GREEN,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 20,
    },
    innerItemTitle: {
        color: "white",
        fontWeight:"bold",
        fontSize:20,
        marginTop:3,
    },
    welcomeContainer: {
        width:"100%",
        height:75,
        padding:20,
        justifyContent:"center",
    }
});

export default hs;