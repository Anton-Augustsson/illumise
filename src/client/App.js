import 'react-native-gesture-handler';
import React from 'react';
import {Platform, StatusBar, View, StyleSheet, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/loginScreen';
import MainScreen from './components/mainScreen/mainScreen';
import Constants from 'expo-constants';
import {colors} from "./components/mainStyles/colors"
import { Localization } from './modules/localization';
import storage from './modules/localStorage/localStorage';

const Stack = createStackNavigator();

class App extends React.Component
{
    async componentDidMount()
    {
        let lang = await storage.getDataObject("lang");
        Localization.lang = lang !== null ? lang : Localization.lang;
    }

    render()
    {
        return(
            <>
                <View style={styles.statusbar} />
                <NavigationContainer>
                    <Stack.Navigator 
                        screenOptions={{
                            headerShown:false,
                            cardStyle:{backgroundColor:colors.DEFAULT_BACKGROUND}
                        }}

                        initialRouteName="Login"
                    >
                        <Stack.Screen 
                            name = "Login" 
                            component={LoginScreen}
                        />

                        <Stack.Screen 
                            name="Main" 
                            component={MainScreen}
                        />


                    </Stack.Navigator>
                </NavigationContainer>
            </>
        );
    }
}

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

const styles = StyleSheet.create({
    statusbar: {
        height: STATUSBAR_HEIGHT,
        backgroundColor: colors.SAMARIT_GREEN,
    }
});

export default App;
