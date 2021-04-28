import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from "../../customComponents/customHeader";
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import { colors } from '../../mainStyles/colors';
import MarketItem from './marketItem';
import {Localization} from '../../../modules/localization'

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
    if(item.type === 'food'){
        text = Localization.getText("foodPrompt")
    }
    if(item.type === 'shopping'){
        text = Localization.getText("shoppingPrompt")
    }
    if(item.type === 'post'){
        text = Localization.getText("postPrompt")
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
                    <Text style={mms.price} numberOfLines={1}>{item.price}</Text>
                    <Text style={mms.priceCurrency}>kr</Text>
                </View>
                <Text style={mms.distance}>{km} km</Text>
            </View>
        </TouchableOpacity>
    );
}

const FirstScreen = (nav) => {
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
                keyExtractor={(item)=>item.id}
                ListHeaderComponent={<FilterView/>}
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