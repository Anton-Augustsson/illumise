import 'react-native-gesture-handler';
import React, {useEffect, useReducer} from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/loginScreen';
import MainScreen from './components/mainScreen/mainScreen';
import Constants from 'expo-constants';
import {colors} from "./components/mainStyles/colors";
import storage from "./modules/localStorage/localStorage";
import {AppContext} from "./components/AppContext";
import SplashScreen from "./components/customComponents/splashScreen";
import account from './modules/client-communication/account';
import { Localization } from './modules/localization';

const Stack = createStackNavigator();

const App = () => 
{
    const [state, dispatch] = useReducer(
        (prevState, action) => {
        switch (action.type) {
                case "restoreUser":
                return {
                    ...prevState,
                    loading: false,
                    signOut: false,
                    user: action.user,
                };
                case "signIn":
                return {
                    ...prevState,
                    loading: false,
                    signOut: false,
                    user: action.user,
                };
                case "signOut":
                return {
                    ...prevState,
                    loading: false,
                    signOut: true,
                };
            }
        },
        {
            loading: true,
            signOut: true,
            user: null,
        }
    );

    useEffect(() => {
        const init = async () => {
            try 
            {
                const userID = await storage.getDataString("userID");
                const user = await account.getFromID(userID);
                if (user !== null)
                {
                    dispatch({type: "restoreUser", user: user});
                }
                else
                {
                    dispatch({type: "signOut"});
                }
            } 
            catch(error) 
            {
                Alert.alert(Localization.getText("networkErrorTitle"), Localization.getText("networkError"));
                dispatch({type: "signOut"});
            }
        }
        init();
    },[]);


    const appContext = 
    {
        signIn: async (id) => 
        {
            try 
            {
                await storage.storeDataString("userID", id);
                const user = await account.getFromID(id);
                dispatch({type: "signIn", user: user });
            } 
            catch (error) 
            {
                console.error(error);
            }
        },
        signOut: async () => 
        {
            try 
            {
                await storage.removeValue("userID");
                dispatch({ type: "signOut" });
            } 
            catch (error) 
            {
                console.error(error)
            }
        },
        getState: () => state,
        setState: (user) => dispatch({type:"restoreUser", user: user})
    }

    return(

        <>
            <View style={styles.statusbar}></View>
            <AppContext.Provider value={appContext}>
                {state.loading ? 
                    <SplashScreen/>
                :
                    <NavigationContainer>
                        <Stack.Navigator 
                            screenOptions={{
                                headerShown:false,
                                cardStyle:{backgroundColor:colors.DEFAULT_BACKGROUND}
                            }}
                        >
                            
                            {state.signOut ?
                                <Stack.Screen 
                                    name = "Login" 
                                    component={LoginScreen}                            
                                />
                                :
                                <Stack.Screen 
                                    name="Main" 
                                    component={MainScreen}
                                />
                            }
                            
                        </Stack.Navigator>
                    </NavigationContainer>
                }
            </AppContext.Provider>
        </>);
    }

    const STATUSBAR_HEIGHT = Constants.statusBarHeight;

    const styles = StyleSheet.create({
        statusbar: {
            height: STATUSBAR_HEIGHT,
            backgroundColor: colors.SAMARIT_GREEN,
        }
    });

export default App;
