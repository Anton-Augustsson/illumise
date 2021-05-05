import React, { useState, useEffect, useCallback} from 'react';
import { Text, View,  FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CustomHeader from "../../customComponents/customHeader";
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import { colors } from '../../mainStyles/colors';
import MarketItem from '../market/marketItem';
import {Localization} from '../../../modules/localization'
import request from '../../../modules/client-communication/request';
import storage from '../../../modules/localStorage/localStorage';
import RequestIcon from "../../customComponents/requestIcon";
import ExpandButton from '../../customComponents/expandButton';
import OrderApprovalScreen from './orderApproval/orderApproval';


const RequestItem = ({nav, item}) => {
    var text = ''
    switch (item.body.type) {
        case 'food':
            text = Localization.getText("foodPrompt")
            break;
        case 'shopping':
            text = Localization.getText("shoppingPrompt")
            break;
        case 'post':
            text = Localization.getText("postPrompt")
            break;
        case 'other':
            text = Localization.getText("otherPrompt")
            break;

    }

    console.log(item);

    return(
        <TouchableOpacity 
            onPress={()=>nav.nav.navigate("OrderApproval", item)}
            style={ms.itemContainer}>
            <RequestIcon type={item.header} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{text}</Text>
            <Text style={oas.time}>{item.dateCreated}</Text>
        </TouchableOpacity>
    );
}



const FirstScreen = (nav) => {
    const [isRequester, setIsRequester] = useState(true);
    const [REQUESTS, setRequests] = useState(null);
    const [isRefreshing, setIsRefresing] = useState(false);
    const [PROVIDERS, setProviders] = useState(null);

    const getRequests = async () => {
        
        if(isRequester){
            const id = await storage.getDataString("userID");
            const res = await request.requester.getUserRequest(id, 100);
            setIsRefresing(false);
            return res;
        }else{
            const id = await storage.getDataString("userID"); 
            const res = await request.provider.getUserProviding(id, 100);
            setIsRefresing(false);
            return res; 
        }
        
        
    }

    const refresh = () => {
        setIsRefresing(true);
        getRequests().then(data => {
            if(data != null){ 
                setRequests(data.filter(obj => obj != null));
            }
        }); 
    }

    useEffect(() => {
        refresh();
    }, []);

    const [expand, setExpand] = useState(false);

    return (
        <View style={{flex:1}}> 
            <CustomHeader 
                title={Localization.getText("myRequests")}
                nav={nav}
                goBack={false}
            />

            <ExpandButton
                expand={false}
                title="Beställningar"
                content={
                    <FlatList
                        data={REQUESTS}
                        renderItem={({item})=><RequestItem nav={nav} item={item}/>}
                        keyExtractor={(item)=>item._id}
                        onRefresh={()=>refresh()}
                        refreshing={isRefreshing}
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
                }
            />
            <ExpandButton
                expand={true}
                title="Tjänster"
                content={
                    <FlatList
                        data={REQUESTS}
                        renderItem={({item})=><RequestItem nav={nav} item={item}/>}
                        keyExtractor={(item)=>item._id}
                        onRefresh={()=>refresh()}
                        refreshing={isRefreshing}
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
                }
            />
        </View>
    );
}

const Stack = createStackNavigator();

const MyOrders = ({navigation}) => {
    return (
       <Stack.Navigator 
            screenOptions={{
                headerShown:false,
                cardStyle:{backgroundColor:colors.DEFAULT_BACKGROUND}
            }}
            initialRouteName="FirstScreen"
        >
            <Stack.Screen 
                name="FirstScreen" 
                children={()=><FirstScreen nav={navigation}/>}
            />

            <Stack.Screen 
                name="OrderApproval" 
                component={OrderApprovalScreen}
            />

            <Stack.Screen 
                name="MarketItem" 
                component={MarketItem}
            />
           
        </Stack.Navigator> 
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


export default MyOrders;