import React, { useEffect, useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native';
import request from '../../../modules/client-communication/request';
import { Localization } from '../../../modules/localization';
import Loading from '../../customComponents/loading';
import ms from '../../mainStyles/ms';
import CustomMap from '../../customComponents/customMap';
import cs from "../../mainStyles/cartStyle";
import MyBottomSheet from '../../customComponents/myBottomSheet';
import { AppContext } from '../../AppContext';
import AcceptHeader from '../../customComponents/acceptHeader';
import account from '../../../modules/client-communication/account';
import chat from '../../../modules/client-communication/chat';

const ShoppingItem = ({item}) => 
{
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

const Header = ({req}) => 
{
    return (
        <View style={mis.padding}>
            {req.header === "other" &&
                <Text style={ms.h2}>{req.body.title}</Text>
            }
        
            <Text style={ms.h4}>{Localization.getText("destinations")}</Text>
            {
                req.body.stops.map((place, index) => (
                    <Text key={index} style={mis.mapText}>{index+1 + ". " + place.address}</Text>
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
    );
}

const BottomSheetContent = ({req}) => (
    <>
        {req.header === "shopping" || req.header === "food" ?
                <FlatList 
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
    </>
)

const DoneLoading = ({navigation, creator, isCreator, req, getState }) => {

    const sheetRef = useRef();

    const remove = async (navigation, req) => {
        try 
        {
            await request.requester.removeRequest(req._id);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Orders' }],
            });
        } 
        catch(error) 
        {
            console.log(error);
        }
    }

    const claim = async (_, req) => {
        try 
        {
            let result = await chat.newChat(req._id, creator._id, getState().user._id);
            console.log(result);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Orders' }],
            });
        } 
        catch(error) 
        {
            console.log(error);
        }
    }
    
    return (
        <>
            <MyBottomSheet
                ref={sheetRef}
                snapPoints={["70%", "40%", "20%", 40]}
                overlay={false}
                renderContent={<BottomSheetContent req={req}/>}
            />

            <AcceptHeader
                userObject={{...creator, getProvider: true}}
                navigation={navigation}
                acceptTitle={isCreator ? Localization.getText("remove") : 
                                         Localization.getText("claim")}
                onButtonPress={async () => {
                    if (isCreator)
                    {
                        await remove(navigation, req);
                    }
                    else
                    {
                        await claim(navigation, req);
                    }
                }}
                buttonStyle={isCreator ? {backgroundColor: "#ff4d4d"} : undefined}
                buttonDisabled={!isCreator && req.providerID != null}
                zIndex={-1}
            />

            <CustomMap
                style={mis.map}
                onMount={() => 
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
                            title:       "Stop " + (parseInt(index)+1),
                            description: stop.location.address,
                            key:         (parseInt(index)+1)
                        };
                    });
                }}
            />
        </>
    );
}

const MarketItem = ({navigation, route}) => {
    const { getState } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState(null);
    const [req, setReq] = useState(null);

    const isCreator = route.params.isCreator !== undefined && route.params.isCreator;

    useEffect(() => {

        const retrieveRequest = async () =>
        {
            let res;
            setReq(res = await request.get(route.params.requestID));

            //Don't need to fetch information about creator if we are it. 
            //if information is old we should update AppContext instead.
            if(isCreator) 
            {
                setCreator(getState().user)
            } else 
            {
                setCreator(await account.getFromID(res.creatorID));
            } 
            setLoading(false);
        }
        retrieveRequest();
    }, []);

    return (
        <View style={{flex:1}}> 
            {loading ? <Loading/> : 
            <DoneLoading 
                navigation={navigation} 
                creator={creator}
                isCreator={isCreator}
                req={req} 
                getState={getState}
            />}
        </View>
    );
}

const mis = StyleSheet.create({
    shoppingItemContainer: {
    },
    map:{
        flex: 1,
        zIndex: -10
    },
    padding: {
        paddingRight:20,
        paddingLeft:20,
    }
});
export default MarketItem;