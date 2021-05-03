import React, { useState, useEffect, useCallback} from 'react';
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
import { getDistance } from 'geolib'
/*
const REQUESTS = [
    {
        "id":"1",
        "shoppingList": [
        {
            "id": "0",
            "name": "Första",
            "otherInfo": "wef",
            "quantity": 1,
        },
        {
            "id": "1",
            "name": "Andra",
            "otherInfo": "NISSE",
            "quantity": 1000000,
        },
        ],
        "stops":  [
            "Wefixit Svenska AB, Fålhagsleden, Uppsala, Sweden",
            "Wefix Trädgård AB, Sandövägen, Vallda, Sweden",
        ],
        "price":"2000000000",
        "time": "13:00",
        "type": "food",
    },
    {
        "id":"2",
        "shoppingList": [
        {
            "id": "0",
            "name": "Banan",
            "otherInfo": "E väldigt fin banan från helvetet",
            "quantity": 1,
        },
        ],
        "stops":  [
            "SHAKMAK AB, Moskva, Russia",
            "Wefix Trädgård AB, Sandövägen, Vallda, Sweden",
        ],
        "time": "13:00",
        "price":"10",
        "type": "shopping"
    },
    {
        "id":"3",
        "postObject": 
        {
            "refCode": "DINMAMMA",
            "otherInfo": "E väldigt fin banan från helvetet",
        },
        "stops":  [
            "SHAKMAK AB, Moskva, Russia",
            "Wefix Trädgård AB, Sandövägen, Vallda, Sweden",
        ],
        "time": "13:00",
        "price":"0.20",
        "type": "post"
    }
]
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
            onPress={()=>nav.nav.navigate("MarketItem", {item: item._id})}
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
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [REQUESTS, setRequests] = useState(null);
    const [isRefreshing, setIsRefresing] = useState(false);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Denied acces to location');
        return;
        }
        let geo = await Location.getCurrentPositionAsync({});
        setLocation(geo);

        let pointStart = coordsToGeoJSON([geo.coords.longitude, geo.coords.latitude]);


        const res = await request.provider.getNearRequests(pointStart, 1000000, 10);
        setIsRefresing(false);
        return res;
    }

    const refresh = () => {
        setIsRefresing(true);
        getLocation().then(data => {
            setRequests(data.filter(obj => obj != null));
        }); 
    }

    useEffect(() => {
        refresh();
    }, []);

     return (
        <View style={{flex:1}}> 
            <CustomHeader 
                title="Market"
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

export default MarketScreen;