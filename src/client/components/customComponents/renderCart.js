import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CartItem from "./cartItem";
import IconButton from './iconButton';
import ms from "../mainStyles/ms";
import rs from "../mainScreen/home/requests/requestStyle";
import {Localization} from "../../modules/localization";

const RenderCart = (props) => (
    <View style={rs.bsContentContainer}>
        <FlatList
            data={props.data}
            renderItem={({item}) => 
                            <CartItem 
                                id={item.id} 
                                name={item.name} 
                                quantity={item.quantity} 
                                otherInfo={item.otherInfo} 
                                deleteItem={deleteItem}
                        />}
            ListEmptyComponent={()=>
                <Text style={[ms.h3, {alignSelf:"center"}]}>
                    {Localization.getText("emptyShoppingCartPrompt")}
                </Text>}
            keyExtractor={(item) => item.id}
        /> 
        
        <View style={rs.moveOnContainer}>
            <IconButton onPress={props.onPress}/>
        </View>
    </View>
);

export default RenderCart;