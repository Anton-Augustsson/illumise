import {StyleSheet} from 'react-native';
import {colors} from "./colors"


const ms = StyleSheet.create({
    // MAIN STYLES
    h1: {
        fontSize:30,
        fontWeight: "bold",
        marginBottom:15,
    },
    h2: {
        fontSize:25,
        fontWeight: "bold",
    }, 
    h3: {
        fontSize:20,
        fontWeight: "bold",
        marginTop:10,
        marginBottom:4,
    },
    h4: {
        fontSize:15,
        fontWeight: "bold",
    },
    h5: {
        fontSize:10,
        fontWeight: "bold",
    },
    h6: {
        fontSize:5,
        fontWeight: "bold",
        color: "white",
    },
    textInput: {
        borderColor:"white",
        borderStyle:"solid",
        color: "white",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        minWidth:150,
        height:50,
        borderRadius:15,
        backgroundColor:colors.SAMARIT_GREEN,
    },
    cancelButton:{
        justifyContent:"center",
        alignItems:"center",
        minWidth:150,
        height:50,
        borderRadius:15,
        backgroundColor:colors.SAMARIT_CANCEL,
    },
    loginButton: {
        marginTop:5,
        flexDirection:"row",
        alignItems:"center",
        width: "100%",
        minWidth:200,
        minHeight:50,
        padding:5,
        borderRadius:15,
    },
    loginButtonIcon: {
        position:"absolute",
        left:10,
        height:40,
        width:40,
    },
    loginButtonText: {
        marginLeft:55,
        fontSize:20,
        fontWeight:"bold",
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainerZ: {
        flex: 3,
        alignItems: "center",
    },
    logoLarge: { // Start up logo
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    logoMedium: { //For logos in selection view
        width: 50,
        height: 50,
    },
    logoSmall: { //For small logos in navigation bar
        width: 20,
        height: 20,
    },
    itemContainer: {
        width:"100%",
        height:60,
        backgroundColor:"white",
        borderBottomWidth:0.5,
        borderBottomColor: "grey",
        borderStyle:"solid",
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:"5%",
        paddingRight:"5%",
    },
    msg: {
        marginLeft:"5%",
        marginRight:60,
        lineHeight:20,
    }
});

// EXPORTS 

export default ms;

