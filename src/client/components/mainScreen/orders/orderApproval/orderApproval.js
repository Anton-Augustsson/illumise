import React, {useEffect} from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity, Image} from 'react-native';
import ms from "../../../mainStyles/ms";
import SamaritButton from '../../../customComponents/samaritButton';
import { Localization } from '../../../../modules/localization';
import { useState } from 'react';
import chat from '../../../../modules/client-communication/chat';
import account from '../../../../modules/client-communication/account';

const ChatRoomItem = ({nav, item, request, index}) => {

    const [other, setOther] = useState(null);

    useEffect(() => 
    {
        const init = async () => 
        {
            console.warn("id", item._id);
            let provider = await account.getFromID(item.provider._id);
            setOther(provider);
        }
        init();
    },[]);

    return (
        <TouchableOpacity 
            style={[oas.chatRoomContainer, index === 0 ? {marginTop:15} : null]}
            onPress={() => nav.navigate("OrderChat", { request: request, chat: item, other: other, isCreator: true})}
        >
            {other?
                <Image
                    style={oas.profileImg}
                    source={{uri: other.picture}}
                />
                :null
            }
            <Text style={oas.chatRoomTitle}>
                {other? ` ${other.firstName} ${other.lastName} ${Localization.getText("willTakeOrder")}`: ""}
            </Text>
        </TouchableOpacity>
    );
}

const OrderApprovalScreen = ({navigation, route}) => {

    const [chats, setChats] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const refresh = async () => 
    {
        setRefreshing(true);
        let result = await chat.getChats(route.params._id);
        if (result) setChats(result);
        setRefreshing(false);
    }

    useEffect(() => {
        refresh();
    },[]);

    return (
        <View style={{flex:1}}>
            <FlatList
                data={chats.length > 0 ? chats : undefined}
                renderItem={({item, index})=>
                    <ChatRoomItem 
                        nav={navigation} 
                        item={item} 
                        index={index} 
                        request={route.params}
                    />
                }
                onRefresh={refresh}
                refreshing={refreshing}
                keyExtractor={(item)=>item._id}
                ListEmptyComponent={()=>
                    <View style={ms.emptyContainer}>
                        <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                            {Localization.getText("noOneHasTakenYourOrder")}
                        </Text>
                    </View>
                }
            />
            <View style={ms.moveOnContainer}>
               <SamaritButton
                    title={Localization.getText("showOrder")}
                    onPress={()=>navigation.navigate("MarketItem", {requestID:route.params._id, isCreator: true})}
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
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:5,
        marginLeft:10,
        marginRight:10,
        marginBottom:15,
        flexDirection:"row",
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 15,
    },
    chatRoomTitle: {
        fontSize:15,
    },
    profileImg: {
        width:35,
        height:35,
        borderRadius:7,
        marginRight:5
    }
});

export default OrderApprovalScreen;

