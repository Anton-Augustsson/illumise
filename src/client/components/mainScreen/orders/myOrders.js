import React, { useState, useEffect, useContext} from 'react';
import { Text, View, Image, FlatList, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import MarketItem from '../market/marketItem';
import {Localization} from '../../../modules/localization'
import request from '../../../modules/client-communication/request';
import RequestIcon from "../../customComponents/requestIcon";
import OrderApprovalScreen from './orderApproval/orderApproval';
import { OrderChatScreen } from './chat/orderChat';
import chat from '../../../modules/client-communication/chat';
import { AppContext } from '../../AppContext';
import SeeReviews from '../../customComponents/seeReviews';
import { screenOptions } from '../navigationOptions';
import account from '../../../modules/client-communication/account';

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

    const [user, setUser] = useState(null);

    useEffect(() => 
    {
        const init = async () => 
        {
            try 
            {
                console.log(item)
                setUser(await account.getFromID(isCreator ? item.providerID : item.creatorID));
            } 
            catch(error) 
            {
                console.log(error);
            }
        }
        init();
    }, []);

    const orderApproval = 
        <TouchableOpacity 
            onPress={() => nav.navigate("OrderApproval", item)}
            style={ms.itemContainer}>
            <RequestIcon type={item.body != undefined ? item.body.type : ""} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{text}</Text>
            <Text style={oas.time}>{new Date(item.dateCreated).toDateString()}</Text>
        </TouchableOpacity>

    const orderChat =
        <TouchableOpacity 
            onPress={() => nav.navigate("OrderChat", { request: item, isCreator: isCreator })}
            style={[oas.takenOuterContainer, isCreator ? {backgroundColor:"#f7f7f7"} : null]}
        >
            <View style={oas.takenContainer}>
                <RequestIcon type={item.body != undefined ? item.body.type : ""} size={30} color="black"/>
                <Text numberOfLines={2} style={ms.msg}>{text}</Text>
                <Text style={oas.time}>{new Date(item.dateCreated).toDateString()}</Text>
            </View>
            <View style={oas.userContainer}>
                <Text style={oas.userTitle}>{isCreator ? Localization.getText("provider") : Localization.getText("deliveringTo")}</Text>
                <Text>{ user ? user.firstName + " " + user.lastName : ""}</Text>
                {user ?
                    <Image
                        style={oas.userImg}
                        source={{uri: user.picture}}
                    />
                    :
                    null
                }
            </View>
        </TouchableOpacity>
 
    return(
        item.providerID === null && isCreator ? orderApproval : orderChat 
    );
}

const FirstScreen = ({nav}) => {

    const {getState} = useContext(AppContext);
    
    const [state, setState] = useState({
        data:[
            {
                "title":Localization.getText("orders"),
                "isCreator":true,
                "data":[]
            },
            {
                "title":Localization.getText("services"),
                "isCreator":false,
                "data":[]
            }
        ],
        isRefreshing: false
    });

    const refresh = async () => {

        setState({...state, isRefreshing:true});

        try 
        {
            let requests = await request.requester.getUserRequest(getState().user._id);
            let providing = await chat.getChatsFrom(getState().user._id, true);
            providing = await Promise.all(providing.map(async (item) => 
            {
                let req = await request.get(item.requestID);
                if (!req) await chat.removeChat(item._id);
                return req;
            }));
            console.log(providing);
            setState({
                data:[
                    {
                        "title":Localization.getText("orders"),
                        "isCreator":true,
                        "data":requests.filter(item => item && !item.isFulfilled)
                    },
                    {
                        "title":Localization.getText("services"),
                        "isCreator":false,
                        "data":providing.filter(item => item && !item.isFulfilled),
                    }
                ],
                isRefreshing: false,
            });
        } 
        catch (error) 
        {
            console.log(error);
        }
        
    }

    useEffect(() => 
    {
        const listen = nav.addListener("focus", async () => 
        {
            refresh();
        });
        return listen;
    }, [nav]);

    return (
        <View style={{flex:1}}> 
            <SectionList
                sections={state.data}
                renderItem={({item, section})=>
                    <RequestItem 
                        nav={nav} 
                        item={item} 
                        isCreator={section.isCreator}
                    />
                }
                keyExtractor={(item)=>item._id}
                renderSectionHeader={({section}) => (
                    state.data.length > 0 ? 
                    <View style={oas.titleButton}>
                        <Text style={oas.titleButtonText}>{section.title}</Text>
                    </View>
                    :null
                )}
                onRefresh={refresh}
                refreshing={state.isRefreshing}
                stickySectionHeadersEnabled
                ListEmptyComponent={()=>
                    <View style={ms.emptyContainer}>
                        <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                            {Localization.getText("youHaveNoServices")}
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const Stack = createStackNavigator();

const MyOrders = ({navigation}) => {
    return (
       <Stack.Navigator 
            screenOptions={screenOptions}
            initialRouteName="FirstScreen"
        >
            <Stack.Screen 
                options={{
                    title:Localization.getText("myRequests")
                }}
                name="FirstScreen" 
                children={()=><FirstScreen nav={navigation}/>}
            />

            <Stack.Screen 
                options={{
                    title:Localization.getText("myRequests")
                }}
                name="OrderApproval" 
                component={OrderApprovalScreen}
            />

            <Stack.Screen 
                options={{
                    title:Localization.getText("chat")
                }}
                name="OrderChat" 
                component={OrderChatScreen}
            />

            <Stack.Screen 
                options={{
                    title:Localization.getText("reviews")
                }}
                name="SeeReviews" 
                component={SeeReviews}
            />

            <Stack.Screen 
                options={{
                    title:""
                }}
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
        marginTop:2.5,
        marginRight:2.5,
        fontWeight:"bold",
        color:"grey",
    },
    title: {
        marginLeft:11,
        marginRight:60,
        lineHeight:20,
    },
    takenOuterContainer: {
        paddingLeft:"5%",
        borderBottomWidth:0.5,
        borderBottomColor: "grey",
        borderStyle:"solid",
        width:"100%",
        paddingBottom:10
    },
    takenContainer: {
        height:65,
        flexDirection:"row",
        alignItems:"center",
    },
    userContainer: {
        flexDirection:"row",
        alignItems:"center",
    },
    userTitle: {
        marginRight:5
    },
    userImg: {
        width:24,
        height:24,
        borderRadius:5,
        marginLeft:5
    },
    titleButton:{
        backgroundColor: "white",
        shadowColor:"#cccccc",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:5,
        paddingLeft:20,
        paddingRight:15,
        paddingTop:13,
        paddingBottom:13,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom: 0,
    },
    titleButtonText:{
        fontSize:20,
        fontWeight:"bold",
    },
});


export default MyOrders;