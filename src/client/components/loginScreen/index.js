import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, Button, Image, ImageBackground} from 'react-native';
import styles from "./styles"
import ms from '../mainStyles/ms';
import GoogleButton from "../customComponents/googleButton";
import FacebookButton from "../customComponents/facebookButton";
import * as Google from 'expo-auth-session/providers/google';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import * as Facebook from 'expo-auth-session/providers/facebook';

const LoginScreen = ({navigation}) => {
    //webclient secret key
    //i7HPvxf7F1MohxIdHcZaZmI0
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '798387138999-f1872j6fqbi2dlcl6mg0rvuscface4ed.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: '798387138999-jfpq5oc79qol6puinlfo3uckk5dlf6fa.apps.googleusercontent.com'
    });


    React.useEffect(() => {
    if (response?.type === 'success') {
            navigation.navigate("Home1", {token: response.params})
        }
    }, [response])


    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: '284019753226391'
        //responseType: ResponseType.Code, 
    });

    React.useEffect(() => {
        if (responseFB?.type === 'success') {
            navigation.navigate("Home1", {token: responseFB.params});
        }
    }, [responseFB]);
    //View flex:1
    //View flex:2 
    //View flex:3 tre gånger större  än 1
    //View
    //justifyContent: vertikalt, alignItems:horizontellt: center, right, left, top, bottom
    //flexDirection: column: vertikalt row: horizontellt
    //justify-content css == justifyContent react
    //Width, Height

    //Container == <View style="flex:1, justifyContent:center, alignItmes:center"> Absolut i mitten
    //                  <Image
    //Container == </View>

    return (
        <View style={styles.loginContainer}>
            <View style={ms.logoContainer}>
                <Image
                    style={ms.logoLarge}
                    source={require("../../assets/samarit_logo2.png")}
                />
                <Text style={ms.h1}>SAMARIT</Text>
            </View>

            <View style={ms.loginContainerZ}>
                <StatusBar style="auto" />

                <GoogleButton
                    onPress={() =>{
                        promptAsync();
                    }}
                    disabled={!request}
                    style={ms.button}
                />

                <FacebookButton
                    onPress={() =>{
                        promptAsyncFB();
                    }}
                    disabled={!requestFB}
                    style={ms.button}
                />
                
            </View>
            
        </View>  
    );
}

export default LoginScreen;
