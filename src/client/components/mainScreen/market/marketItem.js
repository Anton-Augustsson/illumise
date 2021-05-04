import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import request from '../../../modules/client-communication/request';
import { Localization } from '../../../modules/localization';
import storage from '../../../modules/localStorage/localStorage';
import CustomButton from '../../customComponents/customButton';
import CustomHeader from "../../customComponents/customHeader";
import Loading from '../../customComponents/loading';
import ms from '../../mainStyles/ms';
import CustomMap from '../../customComponents/customMap';

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

const DoneLoading = ({creator,req}) => {
    console.log(req);
    return (
        <>
            <ScrollView style={mis.content}>
            {
                req.header === "other" &&
                <Text style={ms.h2}>{req.body.title}</Text>
                
            }
            <CustomMap
                style={mis.map}
                onMount={(region) => 
                {
                    /** @type {[*]} */
                    let stops = req.body.stops;
                    if(stops === null) 
                    {
                        return [];
                    }    
                    return stops.map((stop, index) => 
                    {
                        return {
                            latitude:    stop.location.lat,
                            longitude:   stop.location.lng,
                            title:       "Stopp " + index+1,
                            description: stop.location.adress,
                            key:         index+1
                        };
                    });
                }}
            />

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
                {creator ?  
                    <CustomButton
                        style={ms.cancelButton}
                        styleText={{fontWeight:"bold", fontSize:15}}
                        title={Localization.getText("removeOrder")}
                        onPress={()=>console.log(req)}
                    /> :
                    <CustomButton
                        style={ms.button}
                        styleText={{fontWeight:"bold", fontSize:15}}
                        title={Localization.getText("letsgo")}
                        onPress={()=>console.log(req.creatorID)}
                    />
                }
            </View>
        </>
    );
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const MarketItem = ({navigation, route}) => {

    const [loading, setLoading] = useState(true);
    const [req, setReq] = useState(null);
    const [creator] = useState(route.params.requestId !== null);

    const retrieveRequest = async () => {
        if(route.params.requestId === null) {
            setReq(route.params);
            setLoading(false);
            return;
        } 
        await timeout(1000);
        const userID = await storage.getDataString("userID");
        const req = await request.requester.getUserRequest(userID, 1)
        setReq(req[0]);
        setLoading(false);
    }

    useEffect(() => {
        retrieveRequest();
    }, []);

    return (
        <View style={{flex:1}}> 
            <CustomHeader 
                goBack={creator ? false : true}
                title={creator && Localization.getText("yourOrderIsComplete")}
                nav={navigation}
            />
            {loading ? <Loading/> : <DoneLoading creator={creator} req={req}/>}
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
        height:200,
        width:"100%",
    },
    mapText: {
        marginTop:5,
    }
});
export default MarketItem;