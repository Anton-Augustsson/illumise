import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import SamaritButton from '../../../customComponents/samaritButton';
import { Localization } from '../../../../modules/localization';


const CHAT_ROOMS = [
    {
        "id":"1"
    }
]

const ChatRoomItem = ({nav, item}) => {
    return (
        <TouchableOpacity 
            style={oas.chatRoomContainer}
            onPress={()=>nav.navigate("OrderChat")}
        >
            <Text style={oas.chatRoomTitle}>Bengt vill ta din order</Text>
        </TouchableOpacity>
    );
}

const OrderApprovalScreen = ({navigation, route}) => {

    const [state, setState] = useState(null);

    useEffect(() => {
        const init = async () => {
            try 
            {
                setState(await getUser());

                console.log(state.firstName);
            } 
            catch(error) 
            {
                console.log(error);
            }
        }
        init();
    },[]);

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

