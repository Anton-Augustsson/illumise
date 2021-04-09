import {StyleSheet} from 'react-native';

const itemContainerBackground = "#069547"

const hs = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    contentContainer: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal:20
    },
    itemContainer: {
        flexDirection:"row", 
        justifyContent:"space-evenly",
        marginTop:"5%",
    },
    iconSize: {
        width:150,
        height:150,
    },
    welcomeContainer: {
        width:"100%",
        height:75,
        padding:20,
        justifyContent:"center",
    }
});

export default hs;