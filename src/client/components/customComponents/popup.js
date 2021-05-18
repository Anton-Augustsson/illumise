import React from "react";
import {View, StyleSheet, TouchableOpacity, Modal} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

const Popup = ({content, visible, onClose ,setVisible}) =>  {
    
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.frame}>
                <View style={styles.buttonHeader}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            setVisible(false);
                            onClose ? onClose() : null;
                        }}
                    >
                        <AntDesign name="close" size={25} color="black"/>
                    </TouchableOpacity>
                </View>
                {content}
            </View>
        </Modal>
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
    frame: {
        flexDirection: "column",
        backgroundColor:"white", 
        flex: 1
    },
    button: {
        right:15,
        top:15,
    },
});

export default Popup;
