import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, Image, Button} from 'react-native';
import styles from "./styles"
import ms from '../mainStyles/ms';
import GoogleButton from "../customComponents/googleButton";
import FacebookButton from "../customComponents/facebookButton";
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import CustomButton from '../customComponents/customButton';

const veryfyUser = async (navigation, token, type) => {
    //Skriver ut användarens data i konsolen
    var userInfo;
    if (type === 'facebook'){ 
        userInfo = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +token);
    }else if(type === 'google'){
        userInfo = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +token);
    }
    const body = await userInfo.json();
    //console.log(body);
    navigation.navigate("Main", {type: type, user: body});
}

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
        veryfyUser(navigation, response.authentication.accessToken, 'google'); 
        }
    }, [response])


    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: '284019753226391'
        //responseType: ResponseType.Code, 
    });

    React.useEffect( () => {
        if (responseFB?.type === 'success') {
            //console.log(JSON.stringify(Facebook.discovery));
            //console.log(responseFB.authentication);
            veryfyUser(navigation, responseFB.authentication.accessToken, 'facebook');
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
                <Text style={ms.h1}>Välkommen till SAMARIT!</Text>
            </View>

            <GoogleButton
                onPress={() =>{
                    promptAsync();
                }}
                disabled={!request}
            />

            <FacebookButton
                onPress={() =>{
                    promptAsyncFB();
                }}
                disabled={!requestFB}
            />

            <CustomButton
                style={[ms.loginButton,{backgroundColor:"red"}]}
                styleText={[ms.loginButtonText,{color:"white"}]}
                title="Gå förbi inloggning"
                onPress={() => navigation.navigate("Main", {type:"google",user:{id:"104735997383881408322",email:"marholdtv@gmail.com",verified_email:true,name:"Marhold Marhold",given_name:"Bengt",family_name:"Olsson",picture:"https://lh3.googleusercontent.com/-ggukNDG0VX8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnZ9CX2t6F0LbHJ31docWtx8Eaj3A/s96-c/photo.jpg",locale:"sv"}})}
            />
            
            
        </View>  
    );
}

export default LoginScreen;

