import React, { useState, useEffect, useContext} from 'react';
import { Text, View,  FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CustomHeader from "../../customComponents/customHeader";
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import { colors } from '../../mainStyles/colors';
import MarketItem from '../market/marketItem';
import {Localization} from '../../../modules/localization'
import request from '../../../modules/client-communication/request';
import RequestIcon from "../../customComponents/requestIcon";
import ExpandButton from '../../customComponents/expandButton';
import OrderApprovalScreen from './orderApproval/orderApproval';
import { OrderChatScreen } from './chat/orderChat';
import chat from '../../../modules/client-communication/chat';
import { AppContext } from '../../AppContext';
import SeeReviews from '../../customComponents/seeReviews';

const RequestItem = ({nav, item, isCreator}) => {

    let text = "";
    switch (item.body.type) {
        case 'food':
            text = Localization.getText("foodPrompt");
            break;
        case 'shopping':
            text = Localization.getText("shoppingPrompt");
            break;
        case 'post':
            text = Localization.getText("postPrompt");
            break;
        case 'other':
            text = Localization.getText("otherPrompt");
            break;
    }

    return(
        <TouchableOpacity 
            onPress={() => 
            {
                if (isCreator && item.providerID === null)
                {
                    nav.nav.navigate("OrderApproval", item);
                }
                else
                {
                    nav.nav.navigate("OrderChat", { request: item, isCreator: isCreator });
                }
            }}
            style={ms.itemContainer}>
            <RequestIcon type={item.body != undefined ? item.body.type : ""} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{text}</Text>
            <Text style={oas.time}>{new Date(item.dateCreated).toDateString()}</Text>
        </TouchableOpacity>
    );
}

const FirstScreen = (nav) => {

    const {getState} = useContext(AppContext);
    
    const [state, setState] = useState({
        requests: [],
        isRefreshing: false
    });

    const [provider, setProvider] = useState({
        providing: [],
        isRefreshing: false
    });

    const refreshRequest = async () => {

        setState({...state, isRefreshing:true});

        try 
        {
            const requests = await request.requester.getUserRequest(getState().user._id);
            setState({
                requests: requests,
                isRefreshing: false,
            });
        } 
        catch (error) 
        {
            console.log(error);
        }
        
    }

    const refreshProvider = async () => {
        setProvider({...provider, isRefreshing: true});
        try 
        {
            let providing = await chat.getChatsFrom(getState().user._id, true);
            providing = await Promise.all(providing.map(async (item) => 
            {
                let req = await request.get(item.requestID);
                if (req === null) await chat.removeChat(item._id);
                return req;
            }));

            setProvider({
                providing: providing.filter(item => item !== null),
                isRefreshing: false,
            });
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    useEffect(() => {
        refreshRequest();
        refreshProvider();
    }, []);

    const requestContent = 
        <FlatList
            data={state.requests}
            renderItem={({item})=><RequestItem nav={nav} item={item} isCreator={true}/>}
            keyExtractor={(item)=>item._id}
            onRefresh={refreshRequest}
            refreshing={state.isRefreshing}
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

    const providingContent = 
        <FlatList
            data={provider.providing}
            renderItem={({item})=><RequestItem nav={nav} item={item} isCreator={false}/>}
            keyExtractor={(item)=>item._id}
            onRefresh={refreshProvider}
            refreshing={provider.isRefreshing}
            ListEmptyComponent={()=>
                <View style={ms.emptyContainer}>
                    <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                        {Localization.getText("youHaveNoServices")}
                    </Text>
                </View>
            }
        />

    return (
        <View style={{flex:1}}> 
            <CustomHeader 
                title={Localization.getText("myRequests")}
                nav={nav}
                goBack={false}
            />

            {provider.providing.length == 0 ? requestContent : 
                <ExpandButton
                    expand={true}
                    title={Localization.getText("orders")}
                    content={requestContent}
                />   
            }
            
            {provider.providing.length == 0 ? null : 
                <ExpandButton
                    expand={true}
                    title={Localization.getText("services")}
                    content={providingContent}
                />
            }
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
                name="OrderChat" 
                component={OrderChatScreen}
            />

            <Stack.Screen 
                name="SeeReviews" 
                component={SeeReviews}
            />

            <Stack.Screen 
                name="MarketItem" 
                component={MarketItem}
            />
           
        </Stack.Navigator> 
    );
}

const oas = StyleSheet.create({
    time: {
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