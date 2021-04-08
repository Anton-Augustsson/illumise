import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from './components/userScreen';
import LoginScreen from './components/loginScreen';
import DefaultScreen from './components/defaultScreen';

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
            name="Home1" 
            component={UserScreen}
            />

            <Stack.Screen 
            name="Default" 
            component={DefaultScreen}
            />


        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
