import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import CustomHeader from "../../customComponents/customHeader";

const ShoppingItem = ({item}) => {
    return (
        <TouchableOpacity
            style={mis.shoppingItemContainer}
        >

        </TouchableOpacity>
    );
}

const MarketItem = ({navigation, route}) => {
    return (
        <View style={{flex:1}}> 
            <CustomHeader 
                title={route.params.type}
                nav={navigation}
            />
            {
                route.params.type === "shopping" ?
                <FlatList
                    data={route.params.shoppingList}
                    renderItem={({item})=> <ShoppingItem item={item}/>}
                /> : null
            }
        </View>
    );
}

const mis = StyleSheet.create({
    header:{

    },
    shoppingItemContainer: {
    }
});
export default MarketItem;