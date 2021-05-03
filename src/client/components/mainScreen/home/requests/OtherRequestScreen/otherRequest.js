import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization';
import IconButton from "../../../../customComponents/iconButton";
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import GooglePlaces from "../../../../customComponents/Inputs/googlePlaces";
import storage from '../../../../../modules/localStorage/localStorage';
import request from '../../../../../modules/client-communication/request';
import * as Location from 'expo-location';
const OtherRequestScreen = ({navigation}) => {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [price, setPrice] = useState(0);
    const [geoLocation, setGLocation] = useState("");


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
        let loc = await Location.getCurrentPositionAsync({});
        setGLocation(loc);
        var geo = coordsToGeoJSON([geoLocation.coords.longitude, geoLocation.coords.latitude]);
        return geo;
    }


    const finishOrder = async() =>{
        var loc = await getLocation();
        var data = {
            header: "other",
            body: {
                type: "other",
                stops: [location],
                title: title,
                info: info,
                price: price,
            },
            geoLocation: loc,
            cost: price
        }

        var userID = await storage.getDataString("userID");

        console.log(userID);
        await request.requester.newRequest(userID, data.header, data);
        navigation.navigate("Receipt");
    }
    return (
        <View style={{flex:1}}>
            <CustomHeader
                    title={Localization.getText("Other")}
                    nav={navigation}
            />
            <View style={rs.content}>
                <Text style={ms.h3}>{Localization.getText("doYourOwnRequest")}</Text>
                <FloatingInput 
                    onChangeText={text=>setTitle(text)}
                    placeholder={Localization.getText("heading")}
                    value={title}    
                />
                <FloatingInput 
                    onChangeText={text=>setInfo(text)}
                    multiline 
                    style={rs.multiLinetextInput} 
                    placeholder={Localization.getText("text")}
                    value={info}
                />
                <Text style={ms.h3}>{Localization.getText("place")}</Text>
                <GooglePlaces
                    placeholder={Localization.getText("restaurant")}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
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
                <IconButton onPress={finishOrder}/>
            </View>
        </View>
    );
}

export default OtherRequestScreen;