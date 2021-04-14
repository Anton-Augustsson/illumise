import React from 'react';
import { 
    Text, 
    View, 
    Image, 
    FlatList, 
    useState,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import createFoodRequestScreen from '../createFoodRequestScreen';
import {colors} from "../../mainStyles/colors"
import ms from "../../mainStyles/ms"
import hs from "./homeStyle"
import FoodRequestDoneScreen from "./foodRequestDone";

const DATA = [
    {
        id: "1",
        title: "First Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "2",
        title: "Second Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "3",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "4",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "5",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "6",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "7",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "8",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
];

const InnerItem = (props)  => {
    return(
        <TouchableOpacity onPress={()=> {
            props.nav.navigation.navigate(props.des);
        }} 
        style={hs.innerItemContainer}
        >
            <Image
                resizeMode={'cover'}
                style={hs.iconSize}
                source={props.source}
            />
        </TouchableOpacity>
    );
}

const Item = ({item, nav}) => (
    <View style={hs.itemContainer}> 
        <InnerItem
            source={item.img1}
            des={item.des1}
            nav={nav}
        />
        <InnerItem
            source={item.img2}
            des={item.des2}
            nav={nav}
        />
    </View>
);

const renderItem = ({item}, nav) => { 

    return (
        <Item
            item={item}
            nav={nav}
        />
    );
};

const TopWelcome = (name) => {
    return (
        <View style={hs.welcomeContainer}>
            <Text style={ms.h2}>God dag {name}</Text>
        </View>
    );
}



const FirstScreen = (nav, route) => {
    return (
        <View style={{flex:1}}>
            <TopWelcome name={route.params.user.name}/>
            <FlatList
                data={DATA}
                renderItem={(item) => renderItem(item, nav)}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}


const Stack = createStackNavigator();

const HomeScreen = (navigation, route) => {
    console.log(route);
    console.log("HOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREENHOMESCREEN")

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
                component={()=><FirstScreen route={route}/>}
            />

            <Stack.Screen 
                name="FoodRequest" 
                component={createFoodRequestScreen}
            />

            <Stack.Screen 
                name="FoodRequestDone" 
                component={FoodRequestDoneScreen}
            />
        </Stack.Navigator>
    );
}

export default HomeScreen;
