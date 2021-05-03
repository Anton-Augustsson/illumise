import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import request from '../../../modules/client-communication/request';
import { Localization } from '../../../modules/localization';
import storage from '../../../modules/localStorage/localStorage';
import CustomButton from '../../customComponents/customButton';
import CustomHeader from "../../customComponents/customHeader";
import Loading from '../../customComponents/loading';
import ms from '../../mainStyles/ms';

const ShoppingItem = ({item}) => {
    return (
        <TouchableOpacity
            style={mis.shoppingItemContainer}
        >

        </TouchableOpacity>
    );
}

/*
Din mamma - 69kr
---------
| KARTA |
---------
1
2
3
Plats: swaggatan 13
-----
Lista med saker
*/

const DoneLoading = ({req}) => {
    return (
        <>
            <ScrollView style={mis.content}>
            {
                req.header === "other" &&
                <Text style={ms.h2}>{req.body.title}</Text>
                
            }
            <View style={mis.map}><Text>HÄR SKA KARTAN LIGGA</Text></View>

            {
                req.body.stops.map((place, index) => (
                    <Text key={index} style={mis.mapText}>{index+1 + ". " + place}</Text>
                ))
            }
            {
                req.header === "shopping" || req.header === "food" &&
                <FlatList
                    data={req.shoppingList}
                    renderItem={({item})=> <ShoppingItem item={item}/>}
                />
            }
            
                <Text style={ms.h3}>{Localization.getText("otherInfo")}</Text>
                <Text style={mis.otherInfo}>{req.body.info}</Text>
            </ScrollView>
            <View style={ms.moveOnContainer}>
                {storage.getDataString("userID") === req.creatorID ? 
                    <CustomButton
                        style={ms.button}
                        styleText={{fontWeight:"bold", fontSize:15}}
                        title={Localization.getText("remove")}
                        onPress={()=>console.log(req)}
                    /> :
                    <CustomButton
                        style={ms.button}
                        styleText={{fontWeight:"bold", fontSize:15}}
                        title={Localization.getText("letsgo")}
                        onPress={()=>console.log(req)}
                    />
                }
            </View>
        </>
    );
}


const MarketItem = ({navigation, route}) => {

    const [loading, setLoading] = useState(true);
    const [req, setReq] = useState(null);

    const retrieveRequest = async () => {
        if(route.params.requestId === null) setReq(route.params);
        const userID = await storage.getDataString("userID");
        console.log(userID);
        const req = await request.requester.getUserRequest(userID, 1)
        console.log(req);
        setReq(req);
        setLoading(false);
    }

    useEffect(() => {
        retrieveRequest();
    }, []);

    return (
        <View style={{flex:1}}> 
            <CustomHeader 
                nav={navigation}
            />
            {loading ? <Loading/> : <DoneLoading req={req}/>}
        </View>
    );
}

const mis = StyleSheet.create({
    content: {
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:20,
    },
    header:{

    },
    shoppingItemContainer: {
    },
    map:{
        justifyContent:"center",
        alignItems:"center",
        height:200,
        width:"100%",
        backgroundColor:"yellow",
    },
    mapText: {
        marginTop:5,
    }
});
export default MarketItem;