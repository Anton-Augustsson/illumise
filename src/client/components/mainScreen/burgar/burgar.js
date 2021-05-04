import React from 'react';
import { Text, View, Image, Button, FlatList, StyleSheet,TouchableOpacity, Settings} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {colors} from "../../mainStyles/colors";
import ms from "../../mainStyles/ms";
import CustomHeader from "../../customComponents/customHeader";
import SettingsScreen from "./settings/settings";
import ProfileScreen from "./profile/profile";
import FaqScreen from "./faq/faq";
import BurgarIcons from "../../customComponents/burgarIcons";
import { Localization } from '../../../modules/localization';


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

const ProfilePicture = (props) => 
{
    return (
        <View style={bs.profileContainer}>
            <Image
                style={bs.profileImg}
                source={require("../../../assets/steffe.jpg")}
            />
            <Text style={bs.profileName}>{props.name}</Text>
        </View>
    );
}

const FirstScreen = ({navigation}) => 
{
    return (
        <View style={{flex:1}}>
            <CustomHeader 
                title={Localization.getText("other")}
                nav={navigation}
                goBack ={false}
            />
            
            <FlatList
                data={BURGAR}
                renderItem={({item})=>BurgarItem(item, navigation)}
                keyExtractor={(item)=>item.id}
            />

        </View>
    );
}

const Stack = createStackNavigator();

const BurgarScreen = () => 
{
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown:false,
                cardStyle:{backgroundColor:colors.DEFAULT_BACKGROUND},
                initialRouteName:"FirstScreen"
            }}
        >
            <Stack.Screen 
                name="FirstScreen" 
                component={FirstScreen}
            />

            <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
            />

            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen}
            />

            <Stack.Screen 
                name="Faq" 
                component={FaqScreen}
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
