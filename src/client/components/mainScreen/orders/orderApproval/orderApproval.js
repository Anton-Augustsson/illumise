// TODO

import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";

const PROVIDERS = [
    {
        "id":"1",
        "type":"food",
        "msg":"Ny order xd",
        "time":"13:00",
    },{
        "id":"2",
        "type":"mail",
        "msg":"Du är trash",
        "time":"10:20",
    },{
        "id":"3",
        "type":"msg",
        "msg":"En beställning från ieojfdfdfkefefkjjwoijefiewjfiweiojfijeieojfwoijewofijweiofejwjLilla Huset på 12 bitar sushi",
        "time":"00:00",
    }
]

const OrderApprovalScreen = ({navigation, route}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
              title={route.params.id}
                nav={navigation}
            ></CustomHeader>
        
            <FlatList
                    data={PROVIDERS}
                    renderItem={({item})=>ProviderListItem(item)}
                    keyExtractor={(item)=>item.id}
                />
        </View>

    );
}

const ProviderListItem = (item) => {
    return(
        <TouchableOpacity 
            style={ms.itemContainer}>
            <Text numberOfLines={2} style={ms.msg}>{item.msg}</Text>
            <Text style={oas.time}>{item.time}</Text>
        </TouchableOpacity>
    );
}

const oas = StyleSheet.create({
    time:{
        position:"absolute",
        right:0,
        top:0,
        marginTop:5,
        marginRight:5,
        fontWeight:"bold",
        color:"grey",
    }
});

export default OrderApprovalScreen;

