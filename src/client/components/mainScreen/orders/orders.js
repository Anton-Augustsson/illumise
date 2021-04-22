import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RequestIcon from "../../customComponents/requestIcon";
import CustomHeader from "../../customComponents/customHeader"
import ms from "../../mainStyles/ms";
import { Localization } from '../../../modules/localization';

const ORDERS = [
    {
        "id":"1",
        "type":"food",
        "text":"Banan",
    },{
        "id":"2",
        "type":"package",
        "text":"Banan",
    },{
        "id":"3",
        "type":"mail",
        "text":"Banan",
    }
]

const orderItem = (item) => {
    return (
        <TouchableOpacity style={ms.itemContainer}>
            <RequestIcon type={item.type} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{item.text}</Text>
        </TouchableOpacity>
    );
}

const OrderScreen = ({navigation}) => {
    return (

        <View style={{flex:1}}>
            <CustomHeader 
                title={Localization.getText("myOrders")}
                nav={navigation}
                goBack={false}
            />
            <FlatList 
                data={ORDERS}
                renderItem={({item})=>orderItem(item)}
                keyExtractor={(item)=>item.id}
            
            />

        </View>
    );
}

export default OrderScreen;