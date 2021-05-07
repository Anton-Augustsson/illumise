import React, { useState, useEffect, useContext} from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from "../../customComponents/customHeader";
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import { colors } from '../../mainStyles/colors';
import MarketItem from './marketItem';
import {Localization} from '../../../modules/localization'
import * as Location from 'expo-location';
import request from '../../../modules/client-communication/request';
import RequestIcon from "../../customComponents/requestIcon";
import { AppContext } from '../../AppContext';
import {getDistance} from "geolib";
/*
    { latitude: 51.5103, longitude: 7.49347 },
    
    { latitude: "51° 31' N", longitude: "7° 28' E" }
*/
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



const RequestItem = ({nav, item, pointStart}) => {
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

    //{ latitude: 51.5103, longitude: 7.49347 },
    console.log(pointStart);
    const start = {latitude: pointStart.coordinates[1], longitude: pointStart.coordinates[0]};
    const stop = {latitude: item.body.stops[0].location.lat, longitude: item.body.stops[0].location.lng};
    const dist = getDistance(start, stop);
    const distKM = Math.round(dist/1000);

    return(
        <TouchableOpacity 
            onPress={()=>nav.nav.navigate("MarketItem", item)}
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
    const [REQUESTS, setRequests] = useState(null);
    const [isRefreshing, setIsRefresing] = useState(false);
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

                result = await request.provider.getNearRequests(pointStart, 1000000, 10);
            }
            else
            {
                setErrorMsg('Denied acces to location');
            }
        } 
        catch (error) 
        {
            console.warn(error);
        }
        finally
        {
            return result.filter(result => result != null && result.creatorID !== getState().userID);
        }
    }

    const refresh = () => {
        setIsRefresing(true);
        getNearRequests().then(data => {
            setRequests(data);
        }); 
        setIsRefresing(false);
    }

    useEffect(() => {
        refresh();
    }, []);

     return (
        <View style={{flex:1}}> 
            <CustomHeader 
                title={Localization.getText("market")} 
                nav={nav}
                goBack={false}
            />
            
            <FlatList
                data={REQUESTS}
                renderItem={({item})=><RequestItem pointStart={pointStart} nav={nav} item={item}/>}
                keyExtractor={(item)=>item._id}
                onRefresh={()=>refresh()}
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