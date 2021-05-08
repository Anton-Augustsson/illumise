import React, {useEffect} from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import SamaritButton from '../../../customComponents/samaritButton';
import { Localization } from '../../../../modules/localization';
import { useState } from 'react';
import chat from '../../../../modules/client-communication/chat';
import account from '../../../../modules/client-communication/account';

const ChatRoomItem = ({nav, item, params}) => {

    const [other, setOther] = useState(null);

    useEffect(() => 
    {
        const init = async () => 
        {
            let provider = await account.getFromID(item.provider._id);
            setOther(provider);
        }
        init();
    },[]);

    return (
        <TouchableOpacity 
            style={oas.chatRoomContainer}
            onPress={()=>nav.navigate("OrderChat", { ...params, chat: item, other: other})}
        >
            <Text style={oas.chatRoomTitle}>
                {other != null ? `${other.firstName} ${other.lastName} vill ta din order`
                               : ""}
            </Text>
        </TouchableOpacity>
    );
}

const OrderApprovalScreen = ({navigation, route}) => {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const init = async () => {
            let result = await chat.getChats(route.params.request._id);
            if (result !== null) setChats(result);
        }
        init();
    },[]);

    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={route.params.request.header}
                nav={navigation}
            />

            <View style={{flex:1}}>
            <FlatList
                data={chats.length > 0 ? chats : undefined}
                renderItem={({item})=><ChatRoomItem nav={navigation} item={item} params={route.params}/>}
                keyExtractor={(item)=>item._id}
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
        backgroundColor: "white",
        shadowColor:"#cccccc",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:5,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        flexDirection:"row",
        alignItems:"center",
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:25,
        paddingRight:25,
        borderRadius: 50,
    },
    chatRoomTitle: {
        fontSize:15,
    }
});

export default OrderApprovalScreen;

