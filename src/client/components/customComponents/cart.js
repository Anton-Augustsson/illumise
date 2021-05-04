import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './iconButton';
import ms from "../mainStyles/ms";
import {Localization} from "../../modules/localization";
import QuantityChooser from './quantityChooser';
import cs from "../mainStyles/cartStyle";

const Cart = (props) => {

    const CartItem = ({data, setData, item, deleteItem}) => {
        const [expand, setExpand] = useState(false);
        const [quantity, setQuantity] = useState(item.quantity);
    
        return(
            <TouchableOpacity onPress={()=>setExpand(!expand)} style={cs.listItemContainer}>
                <View style={[cs.listItemView, cs.margin]}>
                    <Text numberOfLines={1} style={cs.listItemText}>
                        {item.name}
                    </Text>
                    <Text style={cs.quantity}>
                        {quantity}
                    </Text>
                    <Ionicons 
                        name="close-circle-sharp" 
                        size={32} 
                        color="red" 
                        onPress={() => deleteItem(item.id)}
                    />
                </View>
                <View style={[cs.listItemInfo, cs.margin, {display: expand ? "flex" : "none"}]}>
                    <View style={cs.otherInfo}>
                        <Text style={ms.h4}>{Localization.getText("otherInfo")}</Text>
                        <Text>
                            {item.info}
                        </Text>
                    </View>
                    <View style={cs.changeQuantity}>
                        <Text style={cs.changeQuantityText}>{Localization.getText("changeQuantity")}</Text>
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

export default Cart;