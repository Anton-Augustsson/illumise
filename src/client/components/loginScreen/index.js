import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, Button, Image, ImageBackground} from 'react-native';
import styles from "./styles"
import ms from '../mainStyles/ms';
import CustomButton from "../customComponents/customButton";
import GoogleButton from "../customComponents/googleButton";
import * as Google from 'expo-auth-session/providers/google';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

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
            navigation.navigate("Home", {token: response.authentication})
        }
    }, [response])

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
                <Text style={ms.h2}>Logga in: </Text>
                <Text style={ms.h3}>Logga in: </Text>
                <Text style={ms.h4}>Logga in: </Text>
                <TextInput style={ms.textInput} placeholder="Användarnamn"/>
                <TextInput style={ms.textInput} placeholder="Lösenord"/>
                <StatusBar style="auto" />

                <Button
                    style = {ms.greenButton}
                    title = "Logga in"
                    accessibilityLabel="Learn more about this purple button"
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                />
                
                <GoogleButton
                    onPress={() =>{
                        promptAsync();
                    }}
                    disabled={!request}
                    style={ms.button}
                />

                <Button 
                    title = "banan"
                    onPress={() => {
                        navigation.navigate("Home1")
                    }}>
                </Button>

            </View>

            <View style={ms.logoContainer}>
                <CustomButton 
                style={ms.greenButton}
                title="OOO GRÖN"
                onPress={() => {
                    navigation.navigate("Default")
                }}
                />
            </View>
            
        </View>  
    );
}

export default LoginScreen;
