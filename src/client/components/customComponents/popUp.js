import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import Overlay from "./overlay";

const Popup = ({content, state, setState}) =>  {
    
    return (
        <>
            <View style={state ? styles.active : styles.notActive}>
                <View style={styles.container}>
                    <View style={styles.buttonHeader}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>setState(false)}
                        >
                            <AntDesign name="close" size={20} color="black"/>
                        </TouchableOpacity>
                    </View>
                    {content}
                </View>
            </View>
            <Overlay
                state={state}
                setState={setState}
                onPress={null}
                zIndex={5}
                closeOnClick={false}
            />
        </>
    );
}

const styles = StyleSheet.create({
    buttonHeader: {
        width:35,
        height:35,
        justifyContent:"flex-end",
        flexDirection:"row",
        alignSelf:"flex-end",
        zIndex:11,
    },
    button: {
        right:10,
        top:10,
    },
    container: {
        position:"absolute",
        zIndex: 10,
        alignSelf:"center",
        height:"80%",
        width:"90%",
        backgroundColor:"white",
        paddingBottom: 25,
        borderRadius: 10,
    },
    active: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        height:"100%",
        width:"100%",
    },
    notActive: {
        display:"none",
    },
});

export default Popup;
