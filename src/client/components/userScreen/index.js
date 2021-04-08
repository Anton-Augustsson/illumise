import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
  
const UserScreen = ({route, navigation}) => {
    const { token } = route.params;
    return (
        <View style={styles.loginContainer}>
            <Text>{JSON.stringify(token)}</Text>
            
        </View>
    );
}

export default UserScreen;