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

const DeliverScreen = ({navigation, route}) => {
    //console.log(JSON.stringify(route));
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);

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
          setErrorMsg('Denied acces to location');
          return;
        }
        const response = await Location.getCurrentPositionAsync({}).then(loc => {
            return [loc.coords.longitude, loc.coords.latitude]
        });

        return response;
    }

    const checkout = async () =>{
        //TODO: kolla att obligatoriska fält är ifyllda
        var result = Object.assign({}, route.params)
        result.stops.push(location);
        
        const geo = await getLocation()

        var coords = coordsToGeoJSON(geo);
        var data = {
            header: result.type,
            body: result,
            cost: price,
            geoLocation: coords,
        }

        const userID = await storage.getDataString("userID");
        const requestID = await request.requester.newRequest(userID, result.type, data);
        navigation.navigate("Market", {screen: "MarketItem", params:{requestID:requestID}});
    }
    

    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("deliveryInfo")}
                nav={navigation}
            />
            <View style={rs.content}>
                    <Text style={ms.h3}>{Localization.getText("enterDelivAddress")}</Text>
                    <GooglePlaces
                        placeholder={Localization.getText("deliveryAddress")}
                        onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        //console.log(data, details);
                        setLocation(data.description);
                        }}
                    />
                    <Text style={ms.h3}>{Localization.getText("enterPrice")}</Text>
                    <FloatingInput 
                        placeholder={Localization.getText("price")}
                        onChangeText={(text)=>setPrice(parseInt(text))}
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
        </View>
    );
}

export default DeliverScreen;