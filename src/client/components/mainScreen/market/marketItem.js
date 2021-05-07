import React, { useEffect, useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity, Dimensions} from 'react-native';
import request from '../../../modules/client-communication/request';
import { Localization } from '../../../modules/localization';
import storage from '../../../modules/localStorage/localStorage';
import CustomHeader from "../../customComponents/customHeader";
import Loading from '../../customComponents/loading';
import ms from '../../mainStyles/ms';
import CustomMap from '../../customComponents/customMap';
import cs from "../../mainStyles/cartStyle";
import MyBottomSheet from '../../customComponents/myBottomSheet';
import { AppContext } from '../../AppContext';
import AcceptHeader from '../../customComponents/acceptHeader';

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

const Header = ({req}) => {
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




const DoneLoading = ({navigation, creator, req, getState}) => {

    const sheetRef = useRef();

    const remove = async (navigation, req) => {
        try 
        {
            await request.requester.removeRequest(req._id);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Orders' }],
            });;
        } 
        catch(error) 
        {
            console.log(error);
        }
    }

    const claim = async (navigation, req) => {
        try 
        {
            await request.provider.set(req._id, getState().user._id);
        } 
        catch(error) 
        {
            console.log(error);
        }
        
    }

    const bottomSheetHeight = Dimensions.get("window").height;
    console.log("creator ", creator)

    return (
        <>
            <MyBottomSheet
                ref={sheetRef}
                snapPoints={["70%", "20%", 40]}
                overlay={false}
                renderContent={<BottomSheetContent req={req}/>}
            />

            <CustomHeader 
                title={creator && Localization.getText("yourOrderIsComplete")}
                nav={navigation}
            />
            
            <AcceptHeader
                userName={`${getState().user.firstName} ${getState().user.lastName}`}
                acceptTitle={creator ? "Remove" : "Claim"}
                onButtonPress={async () => await remove(navigation, req)}
                stars={5}
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

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const MarketItem = ({navigation, route}) => {
    const { getState } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [req, setReq] = useState(null);
    const [creator, setCreator] = useState(false);

    useEffect(() => {

        const retrieveRequest = async () =>
        {
            let userID = getState().user._id;
            if(route.params.requestId === undefined) 
            {
                setReq(route.params);
                setCreator(route.params.creatorID === userID);
            }
            else
            {
                let result = await request.requester.getUserRequest(userID);
                let item = result[result.length-1];
                setReq(item);
                setCreator(item._id === route.params.requestId);
            }
            
            
            setLoading(false);
        }
        retrieveRequest();
    }, []);

    return (
        <View style={{flex:1}}> 
            {loading ? <Loading/> : <DoneLoading navigation={navigation} getState={getState} creator={creator} req={req}/>}
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