import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import styles from "./styles"
  
const UserScreen = ({route, navigation}) => {
    const { token } = route.params;
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.h1}>Välkommen till Samarit!</Text>
            <Text style={styles.h2}>Logga in: </Text>
            <Text style={styles.h3}>Logga in: </Text>
            <Text style={styles.h4}>Logga in: </Text>
            <TextInput style={styles.textInput} placeholder="Användarnamn"/>
            <TextInput style={styles.textInput} placeholder="Lösenord"/>
            <StatusBar style="auto" />
            <Text>{JSON.stringify(token)}</Text>
            
        </View>
    );
}

export default UserScreen;