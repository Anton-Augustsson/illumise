import React, { useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import MarketItem from './marketItem';
import {Localization} from '../../../modules/localization'
import * as Location from 'expo-location';
import request from '../../../modules/client-communication/request';
import RequestIcon from "../../customComponents/requestIcon";
import { AppContext } from '../../AppContext';
import {getDistance} from "geolib";
import SeeReviews from '../../customComponents/seeReviews';
import { screenOptions } from '../navigationOptions';

const RequestItem = ({nav, item, pointStart, isLast}) => {
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

    const start = {latitude: pointStart.coordinates[1], longitude: pointStart.coordinates[0]};
    const stop = {latitude: item.body.stops[0].location.lat, longitude: item.body.stops[0].location.lng};
    const dist = getDistance(start, stop);
    const distKM = Math.round(dist/1000);

    return(
        <TouchableOpacity 
            onPress={()=>nav.nav.navigate("MarketItem", {requestID:item._id})}
            style={mms.itemContainer}
        >
            <RequestIcon type={item.body.type} size={30} color="black"/>
            <Text style={mms.itemText}>{text}</Text>
            <View style={mms.rightRequestContainer}>
                <View style={mms.priceContainer}>
                    <Text style={mms.price} numberOfLines={1}>{item.cost}</Text>
                    <Text style={mms.priceCurrency}>kr</Text>
                </View>
                <Text style={mms.distance}>{distKM} km</Text>
            </View>
        </TouchableOpacity>
    );
}
/** 
 * Get a geoJSON representation of a point
 * @param {[Number]} coordinates [longitude, latitude] coordinates of a point
 * @returns {{*}} representation of a point with coordinates
 */
function coordsToGeoJSON(coordinates)
{
    return { "type": "Point", "coordinates": coordinates };
}

const FirstScreen = (nav) => {
    const {getState} = useContext(AppContext)
    const [REQUESTS, setRequests] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pointStart, setPointStart] = useState([]);

    const getNearRequests = async () => 
    {
        /** @type {[Request]} */
        let result = [];
        try 
        {
            let response = await Location.requestForegroundPermissionsAsync();
            if (response.granted) 
            {
                let geo = await Location.getCurrentPositionAsync();
                let pointStart = coordsToGeoJSON([geo.coords.longitude, geo.coords.latitude]);
                setPointStart(pointStart);
                result = await request.provider.getNearRequests(pointStart, 1000000);
            }
            else
            {
                setErrorMsg('Denied access to location');
            }
        } 
        catch (error) 
        {
            console.warn(error);
        }
        finally
        {
            return result.filter(result => result
                              && !result.isFulfilled
                              && result.creatorID !== getState().user._id
                              && result.providerID == null
                              && result.body.stops != undefined);
        }
    }

    const refresh = () => {
        setIsRefreshing(true);
        getNearRequests().then(data => {
            setRequests(data);
            setIsRefreshing(false);
        });
    }

    useEffect(refresh, []);

     return (
        <View style={{flex:1}}> 
            <FlatList
                data={REQUESTS}
                renderItem={({item, index})=>
                    <RequestItem 
                        pointStart={pointStart} 
                        nav={nav} 
                        item={item} 
                    />}
                keyExtractor={(item)=>item._id}
                onRefresh={refresh}
                refreshing={isRefreshing}
                ListEmptyComponent={()=>
                    <View style={ms.emptyContainer}>
                        <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                            {Localization.getText("marketEmptyMsg")}
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const Stack = createStackNavigator();

const MarketScreen = ({navigation}) => {
    return (
       <Stack.Navigator 
            screenOptions={screenOptions}
            initialRouteName="FirstScreen"
        >
            <Stack.Screen 
                options={{
                    title:Localization.getText("market")
                }}
                name="FirstScreen" 
                children={()=><FirstScreen nav={navigation}/>}
            />

            <Stack.Screen 
                options={{
                    title:""
                }}
                name="MarketItem" 
                component={MarketItem}
            />

            <Stack.Screen 
                options={{
                    title:Localization.getText("reviews")
                }}
                name="SeeReviews" 
                component={SeeReviews}
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
    itemText: {
        marginLeft:15,
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
    },
    map:{
        height:"50%",
        width:"100%",
    },
});

export default MarketScreen;