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
import { OrderChatScreen } from './chat/orderChat';


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
    const [state, setState] = useState({
        userID: null,
        requests: [],
        isRequestingRefreshing: false,
        providing: [],
        isProvidingRefreshing: false
    });

    const refresh = (isProviding) => {

        const init = async () => {

            let newState = { userID: userID };

            if (isProviding)
            {
                setState({isProvidingRefreshing: true});
                const userID = await storage.getDataString("userID");
                const providing = await request.provider.getUserProviding(userID);

                if (providing.length != 0)
                {
                    newState.providing = providing;
                }

                newState.isProvidingRefreshing = false;
            }
            else
            {
                setState({isRequestingRefreshing: true});
                const userID = await storage.getDataString("userID");
                const requests = await request.requester.getUserRequest(userID);
            }
            setState(newState);
        }
        init();
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
                        data={state.requests}
                        renderItem={({item})=><RequestItem nav={nav} item={item}/>}
                        keyExtractor={(item)=>item._id}
                        onRefresh={()=>refresh()}
                        refreshing={state.isRefreshingRequest}
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
                name="OrderChat" 
                component={OrderChatScreen}
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