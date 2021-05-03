import React, { useState, useEffect, useCallback} from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from "../../customComponents/customHeader";
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import { colors } from '../../mainStyles/colors';
import MarketItem from '../market/marketItem';
import {Localization} from '../../../modules/localization'
import request from '../../../modules/client-communication/request';
import storage from '../../../modules/localStorage/localStorage';

const FilterView = () => {
    const filterItems = [
        {
            "id":"0",
            "text":Localization.getText("price")
        },{
            "id":"1",
            "text":Localization.getText("latest")
        },{
            "id":"2",
            "text":Localization.getText("closest")
        },
    ]


    const [expand, setExpand] = useState(false);

    return (
        <View style={mms.filterOuterContainer}>
            <ScrollView horizontal={expand ? false : true}>
                <View style={mms.filterContainer}>
                    {filterItems.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            
                        >
                            <LinearGradient style={mms.filterItemContainer} colors={['grey', 'black']}>
                                <Text style={mms.filterItemText}>{item.text}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={mms.filterExpandContainer}
                onPress={()=>setExpand(!expand)}
            >
                <MaterialIcons 
                    name={expand ? "keyboard-arrow-down": "keyboard-arrow-up"} 
                    size={30} 
                    color="black" 
                />
            </TouchableOpacity>
        </View>
    );
}



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

    const km = "1000";

    return(
        <TouchableOpacity 
            onPress={()=>nav.nav.navigate("MarketItem", item)}
            style={mms.itemContainer}
        >
            <Text>{text}</Text>
            <View style={mms.rightRequestContainer}>
                <View style={mms.priceContainer}>
                    <Text style={mms.price} numberOfLines={1}>{item.cost}</Text>
                    <Text style={mms.priceCurrency}>kr</Text>
                </View>
                <Text style={mms.distance}>{km} km</Text>
            </View>
        </TouchableOpacity>
    );
}

const FirstScreen = (nav) => {
    const [isRequester, setIsRequester] = useState(true);
    const [REQUESTS, setRequests] = useState(null);
    const [isRefreshing, setIsRefresing] = useState(false);

    const getRequests = async () => {
        
        if(isRequester){
            let res = await request.requester.getUserRequest(storage.getDataString("userID"), 1000);
            setIsRefresing(false);
            console.log(res);
            return res;
        }else{
            let res = await request.provider.getUserProviding(storage.getDataString("userID"), 1000);
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

     return (
        <View style={{flex:1}}> 
            <CustomHeader 
                title={Localization.getText("myRequests")}
                nav={nav}
                goBack={false}
            />

            <FlatList
                data={REQUESTS}
                renderItem={({item})=><RequestItem nav={nav} item={item}/>}
                keyExtractor={(item)=>item._id}
                ListHeaderComponent={<FilterView/>}
                onRefresh={()=>refresh()}
                refreshing={isRefreshing}
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
                name="MarketItem" 
                component={MarketItem}
            />
           
        </Stack.Navigator> 
    );
}

const mms = StyleSheet.create({
    filterOuterContainer: {
        flexDirection:"row",
    },
    filterContainer: {
        flex:1,
        flexWrap:"wrap",
        flexDirection:"row",
        paddingBottom:7,
        paddingRight:7,
    },
    filterItemContainer: {
        borderRadius:10,
        minWidth:45,
        alignSelf:"flex-start",
        alignItems:"center",
        padding:7,
        marginLeft:7,
        marginTop:7,
    },
    filterItemText: {
        color:"grey",
    },
    filterExpandContainer: {
        width:50,
        alignItems:"center",
        justifyContent:"center",
    },
    itemContainer: {
        width:"100%",
        height:60,
        backgroundColor:"white",
        borderBottomWidth:0.5,
        borderBottomColor: "grey",
        borderStyle:"solid",
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:"5%",
        paddingRight:"5%",
    },
    rightRequestContainer: {
        position:"absolute",
        right:5,
        alignItems:"flex-end",
        width:65,
    },
    priceContainer: {
        flexDirection:"row",
    },
    price: {
        marginRight:5,
    },
    priceCurrency: {
    },
    distance: {
    }
});

export default MyOrders;