import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native';
import request from '../../../modules/client-communication/request';
import { Localization } from '../../../modules/localization';
import storage from '../../../modules/localStorage/localStorage';
import CustomButton from '../../customComponents/customButton';
import CustomHeader from "../../customComponents/customHeader";
import Loading from '../../customComponents/loading';
import ms from '../../mainStyles/ms';
import CustomMap from '../../customComponents/customMap';
import cs from "../../mainStyles/cartStyle";

const ShoppingItem = ({item}) => {
    const [expand, setExpand] = useState(item.info !== "");
    return (
        <TouchableOpacity onPress={()=>setExpand(!expand)} style={cs.listItemContainer}>
            <View style={[cs.listItemView, cs.margin]}>
                <Text numberOfLines={1} style={cs.listItemText}>
                    {item.name}
                </Text>
                <Text style={cs.quantity}>
                    {item.quantity}
                </Text>
            </View>
            <View style={[cs.listItemInfo, cs.margin, {display: expand ? "flex" : "none"}]}>
                <View style={cs.otherInfo}>
                    <Text style={ms.h4}>{Localization.getText("otherInfo")}</Text>
                    <Text>
                        {item.info}
                    </Text>
                </View>
            </View>
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

const Header = ({req}) => {
    return (
        <>
            <View style={mis.padding}>
                {
                    req.header === "other" &&
                    <Text style={ms.h2}>{req.body.title}</Text>
                }
            </View>
            
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
                            title:       "Stopp " + (parseInt(index)+1),
                            description: stop.location.adress,
                            key:         (parseInt(index)+1)
                        };
                    });
                }}
            />
            <View style={mis.padding}>
           
                <Text style={ms.h4}>{Localization.getText("destinations")}</Text>
                {
                    req.body.stops.map((place, index) => (
                        <Text key={index} style={mis.mapText}>{index+1 + ". " + place.adress}</Text>
                    ))
                }
                    {req.header === "shopping" || req.header === "food" ? 
                    <Text style={ms.h3}>{Localization.getText("shoppingList")}</Text>
                    :
                    <>
                        <Text style={ms.h3}>{Localization.getText("otherInfo")}</Text>
                        <Text style={mis.otherInfo}>{req.body.info}</Text>
                    </>
                }
            </View>
        </>
    );
}

const DoneLoading = ({navigation,creator,req}) => {
    const remove = async (navigation, req) => {
        try {
            await request.requester.removeRequest(req._id);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Orders' }],
            });;
        } catch(err) {
            console.log(err);
        }
    }

    const claim = async (navigation, req) => {
        try {
            const id = await storage.getDataString("userID");
            await request.provider.set(req._id, id);
        } catch(err) {
            console.log(err);
        }
        
    }

    return (
        <>

            <CustomHeader 
                title={creator && Localization.getText("yourOrderIsComplete")}
                nav={navigation}
            />
            {req.header === "shopping" || req.header === "food" ?
                <FlatList 
                    style={mis.content}
                    data={req.body.shoppingList}
                    renderItem={({item})=><ShoppingItem item={item}/>}
                    ListHeaderComponent={()=><Header req={req}/>}
                />
                :
                <FlatList 
                    style={mis.content}
                    ListHeaderComponent={()=><Header req={req}/>}
                />
            }

            <View style={ms.moveOnContainer}>
                {creator ?  
                    <CustomButton
                        style={ms.cancelButton}
                        styleText={{fontWeight:"bold", fontSize:15}}
                        title={Localization.getText("removeOrder")}
                        onPress={()=>remove(navigation, req)}
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

    useEffect(() => {
        const retrieveRequest = async () => {
            if(route.params.requestId === undefined) {
                setReq(route.params);
                setLoading(false);
                return;
            } 
            await timeout(1000);
            const userID = await storage.getDataString("userID");
            var req2 = await request.requester.getUserRequest(userID, 1000);
            req2 = req2.filter(obj=>obj);
            setReq(req2[req2.length-1]);
            setLoading(false);
        }
        retrieveRequest();
    }, []);

    return (
        <View style={{flex:1}}> 
            
            {loading ? <Loading/> : <DoneLoading navigation={navigation} creator={creator} req={req}/>}
        </View>
    );
}

const mis = StyleSheet.create({
    content: {
        flex:1,
  paddingBottom:20,
    },
    shoppingItemContainer: {
    },
    map:{
        height:250,
        width:"100%",
    },
    padding: {
        paddingRight:20,
        paddingLeft:20,
    }
});
export default MarketItem;