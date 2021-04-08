import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import LoginScreen from './components/loginScreen';
import UserScreen from './components/userScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen 
            name = "Login" 
            component={LoginScreen}
            />

            <Stack.Screen 
            name="Home" 
            component={UserScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
