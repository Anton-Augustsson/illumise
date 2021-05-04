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
                    signOut: false,
                    userID: action.id,
                };
                case "signOut":
                return {
                    ...prevState,
                    signOut: true,
                    userID: null,
                };
            }
        },
        {
            loading: true,
            signOut: false,
            userID: null,
        }
    );

    useEffect(() => {
        const checkIfUserExists = async () => {
            try {
                const userID = await storage.getDataString("userID"); 
                dispatch({type:"restoreID", id: userID});
            } catch(err) {
                console.log(err);
            }
        }
        checkIfUserExists();
    },[]);


    const appContext = React.useMemo(
        () => ({
            signIn: async (id) => {
                try {
                    await storage.storeDataString("userID", id);
                    dispatch({ type: "signIn", id: id});
                } catch (err) {
                    console.log(err);
                }
            },
            signOut: async () => {
                try {
                    await storage.removeValue("userID");
                    dispatch({ type: "signOut" });
                } catch (err) {
                    console.log(err)
                }
            },
        }),[]
    );

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
