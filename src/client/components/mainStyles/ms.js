import {StyleSheet} from 'react-native';

const greenSamarit = "#069547";
const blueSamarit = "#39C6F4";

const ms = StyleSheet.create({
    // MAIN STYLES
    h1: {
        fontSize:30,
        fontWeight: "bold",
    },
    h2: {
        fontSize:25,
        fontWeight: "bold",
    }, 
    h3: {
        fontSize:20,
        fontWeight: "bold",
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
    blueButton: {
        backgroundColor: blueSamarit,
        borderRadius: 10,
        width: 300,
        height: 50,
    },
    greenButton: {
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: greenSamarit,
        borderRadius: 15,
        width:300,
        height:50,
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        width:300,
        height:50,
        borderRadius:15,
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
    }
});

// EXPORTS 

export default ms;

