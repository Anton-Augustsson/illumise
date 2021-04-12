import 'react-native-gesture-handler';
import React from 'react';
import {Platform, StatusBar, View, StyleSheet, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/loginScreen';
import DefaultScreen from './components/defaultScreen';

const Stack = createStackNavigator();

const App = () => {
    return(
        <>
            <View style={{backgroundColor:'green', width:1000, height:50}}></View>
            <NavigationContainer>
                <Stack.Navigator 
                    screenOptions={{
                    headerShown:false
                    }}

                    initialRouteName="Login"
                >
                    <Stack.Screen 
                        name = "Login" 
                        component={LoginScreen}
                    />

                    <Stack.Screen 
                        name="Default" 
                        component={DefaultScreen}
                    />


                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;


const styles = StyleSheet.create({
    statusbar: {
        height: STATUSBAR_HEIGHT,
        backgroundColor: "green",
    }

});

export default App;
