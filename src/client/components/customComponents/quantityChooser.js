import React from "react";
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const QuantityChooser = (props) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection:"row",
            alignItems:"center",
        },
        inputContainer: {
            width:35,
            height:35,
            alignItems:"center",
            justifyContent:"center",
        },
        input: {
            fontSize:20,
            fontWeight:"bold",
        },
        buttonContainer: {
            color:"white",
            height:35,
            width:35,
            justifyContent:"center",
            alignItems:"center",
            borderRadius:10,
        },
        plus: {
            backgroundColor:"green",
        },
        minus: {
            backgroundColor:"red",
        },
        text: {
            fontSize:16,
            marginRight:10,
        }
    });

    return (
        <View style={styles.container}>
            {props.text == null ? null : 
            <Text style={styles.text}>{props.text}</Text>}
            <TouchableOpacity
                style={[styles.buttonContainer, styles.minus]}
                onPress={()=>{
                    if (props.state > 1) {
                        props.setState(props.state-1);
                        props.onPressMinus != null ? props.onPressMinus() : null;
                    }
                }}
            >
                <AntDesign name="minus" size={25} color="white" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.input}>{props.state}</Text>
            </View>
            <TouchableOpacity
                style={[styles.buttonContainer, styles.plus]}
                onPress={()=>{
                    if (props.state < 99) {
                        props.setState(props.state+1);
                        props.onPressPlus != null ? props.onPressPlus() : null;
                    }
                }
                }
            >
                <AntDesign name="plus" size={25} color="white" />
            </TouchableOpacity>
            
        </View>
    );
}

export default QuantityChooser;