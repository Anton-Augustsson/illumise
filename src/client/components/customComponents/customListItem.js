import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomListItem = (props, {deleteItem}) => {
    return(
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>
                    {props.text}
                </Text>
                <Ionicons name="close-circle-sharp" size={30} color="red" onPress={() => props.deleteItem(props.id)}/>
            </View>
        </TouchableOpacity>
    );
}

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
        elevation:6,
        padding: 2,
        borderRadius: 10,
        margin: 5,
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        marginLeft: 5,
    },
    listItemText:{
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default CustomListItem;