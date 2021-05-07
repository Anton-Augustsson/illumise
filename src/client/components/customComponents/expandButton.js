import React, {useState} from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ExpandButton = ({expand, style, onPress, styleTitle, 
    styleContent, iconSize, iconColor, ...props}) => {
    const [exp, setExpand] = useState(expand !== null 
                                ? expand : false);
    const styles = StyleSheet.create({
        button:{
            backgroundColor: "white",
            shadowColor:"#cccccc",
            shadowOffset: {
                width:2,
                height:4,
            },
            shadowOpacity:0.8,
            shadowRadius: 2,
            elevation:5,
            paddingLeft:20,
            paddingRight:15,
            paddingTop:13,
            paddingBottom:13,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            marginBottom: exp ? 0 : 4,
        },
        title:{
            fontSize:20,
            fontWeight:"bold",
        },
        content:{
            display:exp ? "flex" : "none",
            marginBottom: exp ? 4 : 0,
        }
    });
    
    return(
        <>
            <TouchableOpacity 
                {...props}
                style={style !== null ? styles.button : style}
                onPress={()=>{
                    setExpand(!exp); 
                    onPress !== null ? onPress : null;
                }}
            >   
                <Text style={[styleTitle, styles.title]}>{props.title}</Text>
                <MaterialIcons 
                    name={exp ? "keyboard-arrow-down": "keyboard-arrow-up"} 
                    size={iconSize === null ? iconSize : 24} 
                    color={iconColor === null ? iconColor :  "black"}
                />
            </TouchableOpacity>
            <View style={[styleContent, styles.content]}>
                {props.content}
            </View>
        </>

    );
}

export default ExpandButton;