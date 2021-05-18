import React from 'react';
import { Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ms from "../../mainStyles/ms";
import SettingsScreen from "./settings/settings";
import ProfileScreen from "./profile/profile";
import FaqScreen from "./faq/faq";
import BurgarIcons from "../../customComponents/burgarIcons";
import { Localization } from '../../../modules/localization';
import { screenOptions } from '../navigationOptions';
import SeeReviews from '../../customComponents/seeReviews';


const BURGAR = [
    {
        "id":"1",
        "title": Localization.getText("profile"),
        "des":"Profile",
    },{
        "id":"2",
        "title": Localization.getText("options"),
        "des":"Settings",
    },{
        "id":"3",
        "title": Localization.getText("help"),
        "des":"Faq",
    },
]


const BurgarItem = (item, navigation) => 
{
    
    return(
        <TouchableOpacity 
            onPress={()=>navigation.navigate(item.des)}
            style={ms.itemContainer}>
            <BurgarIcons type={item.des} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{item.title}</Text>
        </TouchableOpacity>
    );
}



const FirstScreen = ({navigation}) => 
{
    return (
        <FlatList
            data={BURGAR}
            renderItem={({item})=>BurgarItem(item, navigation)}
            keyExtractor={(item)=>item.id}
        />
    );
}

const Stack = createStackNavigator();

const BurgarScreen = () => 
{
    return (
        <Stack.Navigator 
            screenOptions={screenOptions}
        >
            <Stack.Screen 
                options={{
                    title: Localization.getText("other")
                }}
                name="FirstScreen" 
                component={FirstScreen}
            />

            <Stack.Screen 
                options={{
                    title: Localization.getText("options")
                }}
                name="Settings" 
                component={SettingsScreen}
            />

            <Stack.Screen 
                options={{
                    title: Localization.getText("profile")
                }}
                name="Profile" 
                component={ProfileScreen}
            />

            <Stack.Screen 
                options={{
                    title: Localization.getText("faq")
                }}
                name="Faq" 
                component={FaqScreen}
            />

            <Stack.Screen 
                options={{
                    title: Localization.getText("reviews")
                }}
                name="SeeReviews" 
                component={SeeReviews}
            />
            
        </Stack.Navigator>
    );
}

const bs = StyleSheet.create({
    time:{
        position:"absolute",
        right:0,
        top:0,
        marginTop:5,
        marginRight:5,
        fontWeight:"bold",
        color:"grey",
    },
    profileContainer: {
        alignSelf:"center",
        marginBottom:20,
        marginTop:20,
    },
    profileImg: {
        height:180,
        width:180,
        borderRadius:90,
        marginBottom:6,
    },
    profileName: {
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:22,
    }
});

export default BurgarScreen;
