import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization'
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';
import request from '../../../../../modules/client-communication/request';
import storage from '../../../../../modules/localStorage/localStorage';
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import * as Location from 'expo-location';
import {CommonActions} from "@react-navigation/native";
import Loading from "../../../../customComponents/loading";

const DeliverScreen = ({navigation, route}) => {
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [checkingOut, setCheckingOut] = useState(false);

        /** 
     * Get a geoJSON representation of a point
     * @param {[Number]} coordinates [longitude, latitude] coordinates of a point
     * @returns {{*}} representation of a point with coordinates
     */
    function coordsToGeoJSON(coordinates)
    {
        return { "type": "Point", "coordinates": coordinates };
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Denied access to location');
          return;
        }
        const response = await Location.getCurrentPositionAsync({}).then(loc => {
            return [loc.coords.longitude, loc.coords.latitude]
        });

        return response;
    }

    const checkout = async () =>{
        if(location === "") return;
        if(price === 0) return;
        setCheckingOut(true);

        //TODO: check if fields are valid
        var result = Object.assign({}, route.params)
        result.stops.push(location);
        try {
            const coords = coordsToGeoJSON([result.stops[0].location.lng, result.stops[0].location.lat]);
            const data = {
                header: result.type,
                body: result,
                cost: price,
                geoLocation: coords,
            }
            
            const userID    = await storage.getDataString("userID");
            const requestID = await request.requester.newRequest(userID, result.type, data);
            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        {
                            name:"Orders",
                            state: {
                                routes: [
                                    {name:"FirstScreen"},
                                    {
                                        name:"MarketItem",
                                        params:{requestID: requestID, isCreator: true},
                                    },
                                ]
                            }, 
                        },
                        {
                            name:"Home",
                        }
                    ]
                })
            );
        }
        catch (err) {
            console.log(err);
            setCheckingOut(false);
        }
    }
    

    return (
        <View style={{flex:1}}>
            {checkingOut ? 
            <Loading info={Localization.getText("creatingRequest...")}/> :
            <>
                <CustomHeader
                    title={Localization.getText("deliveryInfo")}
                    nav={navigation}
                />
                <View style={rs.content}>
                    <Text style={ms.h3}>{route.params.type === "other" 
                        ? Localization.getText("place") : Localization.getText("enterDelivAddress")}
                    </Text>
                    <GooglePlaces
                        placeholder={Localization.getText("deliveryAddress")}
                        fetchDetails = {true}
                        onPress={(data, details = null) => {
                            setLocation({address: data.description, location: details.geometry.location});
                        }}
                    />
                    <Text style={ms.h3}>{Localization.getText("enterPrice")}</Text>
                    <FloatingInput 
                        placeholder={Localization.getText("price")}
                        onChangeText={(text)=>setPrice(parseInt(text))}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={ms.moveOnContainer}>
                    <CustomButton
                        style={ms.button}
                        styleText={{fontWeight:"bold"}}
                        title={Localization.getText("finishOrder")}
                        onPress={checkout}
                    />
                </View>
            </>
            }
        </View>
    );
}

export default DeliverScreen;