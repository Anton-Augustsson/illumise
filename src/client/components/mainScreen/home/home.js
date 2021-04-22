import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodRequestScreen from './foodRequestScreen/foodRequest';
import {colors} from "../../mainStyles/colors";
import ms from "../../mainStyles/ms";
import hs from "./homeStyle";
import FoodRequestDoneScreen from "./foodRequestScreen/foodRequestDone";
import RequestIcon from "../../customComponents/requestIcon";
import { Localization } from "../../../modules/localization";

const DATA = [
    {
        id: "1",
        title1: Localization.getText("food"),
        title2: Localization.getText("package"),
        type1: "food",
        type2: "package",
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "2",
        title1: Localization.getText("mail"),
        title2: Localization.getText("other"),
        type1: "mail",
        type2: "other",
        des1: "FoodRequest",
        des2: "FoodRequest",
    }
];

const InnerItem = (props)  => 
{
    return(
        <TouchableOpacity 
            onPress={()=> {
                props.nav.navigation.navigate(props.des);
            }} 
            style={hs.innerItemContainer}
        >
            <RequestIcon type={props.type} size={70} color="white"/>
            <Text style={hs.innerItemTitle}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const Item = ({item, nav}) => (
    <View style={hs.itemContainer}> 
        <InnerItem
            type={item.type1}
            des={item.des1}
            nav={nav}
            title={item.title1}
        />
        <InnerItem
            type={item.type2}
            des={item.des2}
            nav={nav}
            title={item.title2}
        />
    </View>
);

const renderItem = ({item}, nav) => 
{ 
    return (
        <Item
            item={item}
            nav={nav}
        />
    );
};

const TopWelcome = ({user}) => 
{
    return (
        <View style={hs.welcomeContainer}>
            <Text style={ms.h2}>{Localization.getText("welcome")} {user.user.name}!</Text>
        </View>
    );
}



const FirstScreen = ({nav, user}) => {
    return (
        <View style={{flex:1}}>
            
            <TopWelcome user={user}/>
            <FlatList
                data={DATA}
                renderItem={(item) => renderItem(item, nav)}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}


const Stack = createStackNavigator();

const HomeScreen = (user) => {
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
                children={(navigation)=><FirstScreen nav={navigation} user={user}/>}
            />

            <Stack.Screen 
                name="FoodRequest" 
                component={FoodRequestScreen}
            />

            <Stack.Screen 
                name="FoodRequestDone" 
                component={FoodRequestDoneScreen}
            />
        </Stack.Navigator>
    );
}

export default HomeScreen;
