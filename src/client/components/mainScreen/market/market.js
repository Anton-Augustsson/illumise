import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from "../../customComponents/customHeader";
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import { colors } from '../../mainStyles/colors';

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
        "type": "food"
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
        "type": "post"
    }
]

const RequestItem = (item) => {

    return(
        <TouchableOpacity 
            style={ms.itemContainer}>
            <Text numberOfLines={2} style={ms.msg}>{item.msg}</Text>
        </TouchableOpacity>
    );
}

const FilterView = () => {
    const filterItems = [
        {
            "id":"0",
            "text":"Hje"
        },{
            "id":"1",
            "text":"Fult"
        },{
            "id":"2",
            "text":"TId"
        },{
            "id":"3",
            "text":"TId"
        },{
            "id":"4",
            "text":"TId"
        },{
            "id":"5",
            "text":"TId"
        },{
            "id":"6",
            "text":"TId"
        },{
            "id":"7",
            "text":"TId"
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
                renderItem={({item})=>RequestItem(item)}
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
    }
});

export default MarketScreen;