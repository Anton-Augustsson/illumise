import React, {useEffect, useContext} from 'react';
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
import { useState } from 'react/cjs/react.development';
import Loading from '../customComponents/loading';
import {AppContext} from "../AppContext";

const verifyUser = async (signIn, token, type, setLoggingIn) =>
{
    try {
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
        

        await account.createAccount(credentials);
        const data = await account.get(credentials.email, credentials.token);
        signIn(data._id);
    } catch(err) {
        setLoggingIn(false);
    }
}

const LoginScreen = (navigation) => 
{
    const { signIn} = useContext(AppContext); 
    //web-client secret key
    //i7HPvxf7F1MohxIdHcZaZmI0
    const [loggingIn, setLoggingIn] = useState(false);


    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '798387138999-f1872j6fqbi2dlcl6mg0rvuscface4ed.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: '798387138999-jfpq5oc79qol6puinlfo3uckk5dlf6fa.apps.googleusercontent.com'
    });


    useEffect(() => {
        if (response?.type === 'success') 
        {
            verifyUser(signIn, response.authentication.accessToken, 'google', setLoggingIn); 
        }
    }, [response])


    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: '284019753226391'
        //responseType: ResponseType.Code, 
    });

    useEffect(() => {
        if (responseFB?.type === 'success') 
        {
            verifyUser(signIn, responseFB.authentication.accessToken, 'facebook');
        }
    }, [responseFB]);


    const login = (type) => {
        try {
            setLoggingIn(true);
            switch(type) {
                case "facebook":
                    promptAsyncFB() 
                    break;
                case "google":
                    promptAsync() 
                    break;

            }
        } catch(err) {
            console.log(err)
        }
    }

    //navigation.navigate("Main", {type:"google",user:{id:"",email:"marholdtv@gmail.com",verified_email:true,name:"Marhold Marhold",given_name:"Bengt",family_name:"Olsson",picture:"https://lh3.googleusercontent.com/-ggukNDG0VX8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnZ9CX2t6F0LbHJ31docWtx8Eaj3A/s96-c/photo.jpg",locale:"sv"}}

    return (
        <View style={styles.loginContainer}>
            {loggingIn ? <Loading info={Localization.getText("loggingIn")}/> :
            <>
                <View style={ms.logoContainerLogin}>
                    <Image
                        style={ms.logoLarge}
                        source={require("../../assets/samarit_logo2.png")}
                    />
                    <Text style={ms.h1}>{Localization.getText("welcomeBold")}</Text>
                </View>

                <GoogleButton
                    onPress= {()=>login("google")}
                    disabled={!request}
                />

                <FacebookButton
                    onPress={()=>login("facebook")}
                    disabled={!requestFB}
                />

               
            </>
            }
        </View>  
    );
}

export default LoginScreen;

