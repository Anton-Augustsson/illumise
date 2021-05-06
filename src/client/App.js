import 'react-native-gesture-handler';
import React, {useEffect, useReducer} from 'react';
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/loginScreen';
import MainScreen from './components/mainScreen/mainScreen';
import Constants from 'expo-constants';
import {colors} from "./components/mainStyles/colors";
import ReviewScreen from './components/mainScreen/orders/review/reviewScreen';
import storage from "./modules/localStorage/localStorage";
import {AppContext} from "./components/AppContext";
import SplashScreen from "./components/customComponents/splashScreen";
import account from './modules/client-communication/account';

const Stack = createStackNavigator();

const App = () => 
{
    const [state, dispatch] = useReducer(
        (prevState, action) => {
        switch (action.type) {
                case "restoreID":
                return {
                    ...prevState,
                    userID: action.id,
                    loading: false,
                };
                case "signIn":
                return {
                    ...prevState,
                    userID: action.id,
                };
                case "signOut":
                return {
                    ...prevState,
                    userID: null,
                };
            }
        },
        {
            loading: true,
            userID: null,
        }
    );

    useEffect(() => {
        const init = async () => {
            try 
            {
                await storage.removeValue("userID");
                const userID = await storage.getDataString("userID"); 
                dispatch({type:"restoreID", id: userID});
            } 
            catch(error) 
            {
                console.log(error);
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
                dispatch({ type: "signIn", id: id});
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
        /** @returns {Promise<User>} User*/
        getUser: async () => 
        {
            try 
            {
                let user = await account.getFromID(state.userID);
                console.log("hej"+user);
                return user;
            } 
            catch (error) 
            {
                console.error(error);
            }
        }
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
                            
                            {state.userID === null ?
                                <Stack.Screen 
                                    name = "Login" 
                                    component={LoginScreen}                            />
                                :
                                <Stack.Screen 
                                    name="Main" 
                                    component={MainScreen}
                                />
                            }

                            <Stack.Screen
                                name="Review"
                                component={ReviewScreen}
                                />
                            
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
