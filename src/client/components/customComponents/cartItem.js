import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
    const [expand, setExpand] = useState(false);

    const styles = StyleSheet.create({
        listItem:{
            backgroundColor: 'white',
            shadowColor:"#cccccc",
            shadowOffset: {
                width:2,
                height:4,
            },
            shadowOpacity:0.8,
            shadowRadius: 2,
            elevation:4,
            paddingRight:8,
            paddingLeft:8,
            paddingBottom:expand ? 8 : 0,
            borderRadius: 10,
            marginLeft:10,
            marginRight:10,
            marginTop:5,
            marginBottom:5,
        },
        listItemView:{
            height:40,
            flexDirection: 'row',
            alignItems:"center",
            justifyContent: 'space-between',
        },
        listItemInfo: {
            borderTopWidth:0.5,
            display:expand ? "flex" : "none",
        },
        listItemText:{
            width:"80%",
            fontSize: 15,
            fontWeight: 'bold',
        }
    });
    return(
        <TouchableOpacity onPress={()=>setExpand(!expand)} style={styles.listItem}>
            <View style={styles.listItemView}>
                <Text numberOfLines={1} style={styles.listItemText}>
                    {props.name}
                </Text>
                <Text>
                    {props.quantity}
                </Text>
                <Ionicons 
                    name="close-circle-sharp" 
                    size={30} 
                    color="red" 
                    onPress={() => props.deleteItem(props.id)}
                />
            </View>
            <View style={styles.listItemInfo}>
                <Text>
                    {props.otherInfo}
                </Text>
            </View>
        </TouchableOpacity>
    );
}



export default CartItem;