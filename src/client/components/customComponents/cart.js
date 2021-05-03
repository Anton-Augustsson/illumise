import React, {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './iconButton';
import ms from "../mainStyles/ms";
import {Localization} from "../../modules/localization";
import QuantityChooser from './quantityChooser';

const Cart = (props) => {

    const CartItem = ({data, setData, item, deleteItem}) => {
        const [expand, setExpand] = useState(false);
        const [quantity, setQuantity] = useState(item.quantity);
    
        return(
            <TouchableOpacity onPress={()=>setExpand(!expand)} style={styles.listItemContainer}>
                <View style={[styles.listItemView, styles.margin]}>
                    <Text numberOfLines={1} style={styles.listItemText}>
                        {item.name}
                    </Text>
                    <Text style={styles.quantity}>
                        {quantity}
                    </Text>
                    <Ionicons 
                        name="close-circle-sharp" 
                        size={32} 
                        color="red" 
                        onPress={() => deleteItem(item.id)}
                    />
                </View>
                <View style={[styles.listItemInfo, styles.margin, {display: expand ? "flex" : "none"}]}>
                    <View style={styles.otherInfo}>
                        <Text style={ms.h4}>{Localization.getText("otherInfo")}</Text>
                        <Text>
                            {item.otherInfo}
                        </Text>
                    </View>
                    <View style={styles.changeQuantity}>
                        <Text style={styles.changeQuantityText}>{Localization.getText("changeQuantity")}</Text>
                        <QuantityChooser
                            state={quantity}
                            setState={setQuantity}
                            onPressPlus={()=>{
                                for (let i = 0; i < data.length; i++) {
                                    if(data[i].id == item.id) {
                                        data[i].quantity += 1;
                                        setData(data);
                                        break;
                                    }
                                }

                            }}
                            onPressMinus={()=>{
                                for (let i = 0; i < data.length; i++) {
                                    if(data[i].id == item.id) {
                                        data[i].quantity -= 1;
                                        setData(data);
                                        break;
                                    }
                                }
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return(
        <>
            <FlatList
                data={props.data}
                setData={props.setData}
                renderItem={({item}) => 
                    <CartItem 
                        data={props.data}
                        setData={props.setData}
                        item={item} 
                        deleteItem={props.deleteItem}
                    />}
                ListEmptyComponent={()=>
                    <Text style={[ms.h3, {alignSelf:"center"}]}>
                        {Localization.getText("emptyShoppingCartPrompt")}
                    </Text>}
                keyExtractor={(item) => item.id}
            /> 
            
            <View style={ms.moveOnContainer}>
                <IconButton onPress={props.onPress}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    listItemContainer:{
        backgroundColor: 'white',
        shadowColor:"#cccccc",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:4,
        borderRadius: 10,
        padding:8,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
    },
    listItemView:{ 
        flexDirection: 'row',
        alignItems:"center",
        justifyContent: 'space-between',
    },
    listItemInfo: {
        borderTopWidth:0.5,
        marginRight:5,
        marginBottom:5,
        paddingTop:5,
        marginTop:7,
    },
    listItemText:{
        width:"80%",
        fontSize: 20,
        fontWeight: 'bold',
    },
    otherInfo: {
        paddingTop:5,
        minHeight:75,
        paddingBottom:10,
    },
    quantity: {
        fontSize:17,
        fontWeight:"bold",
    },
    changeQuantity: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
    },
    changeQuantityText: {
        marginRight:10,
    },
    margin: {
        marginLeft:5,
    }
});

export default Cart;