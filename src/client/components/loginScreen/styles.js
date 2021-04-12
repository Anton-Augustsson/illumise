import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    //MAIN STYLES
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
    textInput: {
        borderColor:"#dadce0",
        borderStyle:"solid",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },
    button: {
        color:"#841584",
        borderRadius: 10,
    },
    //LOGIN
    loginContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        padding: 40,
    },
    loginTitle: {

    },
    loginText: {

    },
});
export default styles;