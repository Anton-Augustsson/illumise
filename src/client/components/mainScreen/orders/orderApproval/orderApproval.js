import React from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import SamaritButton from '../../../customComponents/samaritButton';
import { Localization } from '../../../../modules/localization';

const CHAT_ROOMS= [
    {
        "id":"1",
    },
]

const ChatRoomItem = ({nav, item}) => {
    return (
        <TouchableOpacity 
            style={oas.chatRoomContainer}
            onPress={()=>nav.nav.navigate("FirstScreen")}
        >
            <Text style={oas.chatRoomTitle}>Bengt vill ta din order</Text>
        </TouchableOpacity>
    );
}

const OrderApprovalScreen = ({navigation, route}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={route.params.header}
                nav={navigation}
            />

            <View style={{flex:1}}>
            <FlatList
                data={CHAT_ROOMS}
                renderItem={({item})=><ChatRoomItem nav={navigation} item={item}/>}
                keyExtractor={(item)=>item.id}
                ListEmptyComponent={()=>
                    <View style={ms.emptyContainer}>
                        <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                            {Localization.getText("youHaveNoOrders")}
                        </Text>
                        <Text style={ms.emptyMsg}>
                            {Localization.getText("youHaveNoOrders2")}
                        </Text>
                    </View>
                }
            />
            </View>

            <View style={ms.moveOnContainer}>
               <SamaritButton
                    title={Localization.getText("showOrder")}
                    onPress={()=>navigation.navigate("MarketItem", route.params)}
               />
            </View>
        </View>
    );
}


const oas = StyleSheet.create({
    chatRoomContainer: {
        backgroundColor:"red",
        flexDirection:"row",
        alignItems:"center",
        padding:20,
    },
    chatRoomTitle: {

    }
});

export default OrderApprovalScreen;

