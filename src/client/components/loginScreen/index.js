import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from "./styles"
import ms from '../mainStyles/ms';
import GoogleButton from "../customComponents/googleButton";
import FacebookButton from "../customComponents/facebookButton";
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import CustomButton from '../customComponents/customButton';
import { Localization } from '../../modules/localization';
import account from "../../modules/client-communication/account";
import storage from "../../modules/localStorage/localStorage"

const verifyUser = async (navigation, token, type) =>
{
    var userInfo = await fetch(type === 'facebook' 
                 ? 'https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,picture,friends&access_token=' + token
                 : 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    var body = await userInfo.json();

    let credentials = 
        {
            "firstName":body.given_name,
            "lastName":body.family_name,
            "email":body.email,
            "token":"g"+body.id, 
        };   

    if(type === "facebook") {
        credentials =
            {
                "firstName":body.first_name,
                "lastName":body.last_name,
                "email":body.email,
                "token":"f"+body.id 
            };    
    }
    
    

    account.createAccount(credentials).then(() => {
        account.get(credentials.email, credentials.token).then((data) => {
            const id = JSON.stringify(data);
            storage.storeDataString("userID", id)
        });
    });
    
    

    //Store response in local database
    //await storage.storeDataString("userID", userID);
    //console.log(storage.getDataString("userID"));
    
    navigation.navigate("Main");
}

const LoginScreen = ({navigation}) => 
{
    //web-client secret key
    //i7HPvxf7F1MohxIdHcZaZmI0
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '798387138999-f1872j6fqbi2dlcl6mg0rvuscface4ed.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: '798387138999-jfpq5oc79qol6puinlfo3uckk5dlf6fa.apps.googleusercontent.com'
    });


    React.useEffect(() => {
        if (response?.type === 'success') 
        {
            verifyUser(navigation, response.authentication.accessToken, 'google'); 
        }
    }, [response])


    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: '284019753226391'
        //responseType: ResponseType.Code, 
    });

    React.useEffect(() => {
        if (responseFB?.type === 'success') 
        {
            verifyUser(navigation, responseFB.authentication.accessToken, 'facebook');
        }
    }, [responseFB]);

    return (
        <View style={styles.loginContainer}>
            <View style={ms.logoContainer}>
                <Image
                    style={ms.logoLarge}
                    source={require("../../assets/samarit_logo2.png")}
                />
                <Text style={ms.h1}>{Localization.getText("welcomeBold")}</Text>
            </View>

            <GoogleButton
                onPress= { () => { promptAsync() }}
                disabled={!request}
            />

            <FacebookButton
                onPress={ () => { promptAsyncFB() }}
                disabled={!requestFB}
            />

            <CustomButton
                style={[ms.loginButton, { backgroundColor: "red" }]}
                styleText={[ms.loginButtonText, { color: "white" }]}
                title={Localization.getText("skipLogin")}
                onPress={() => navigation.navigate("Main", {type:"google",user:{id:"104735997383881408322",email:"marholdtv@gmail.com",verified_email:true,name:"Marhold Marhold",given_name:"Bengt",family_name:"Olsson",picture:"https://lh3.googleusercontent.com/-ggukNDG0VX8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnZ9CX2t6F0LbHJ31docWtx8Eaj3A/s96-c/photo.jpg",locale:"sv"}})}
            />
            
            <CustomButton
                style={[ms.loginButton, { backgroundColor: "red" }]}
                styleText={[ms.loginButtonText, { color: "white" }]}
                title={"Review"}
                onPress={async () => {
                    global.providerID = "g108222948329932423985";
                    //TODO: ANGE ETT ID SOM FINNS I DATABASEN OVAN
                    navigation.navigate("Review");
                }}
 
            />
        </View>  
    );
}

export default LoginScreen;

