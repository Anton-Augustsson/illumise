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

const DeliverScreen = ({navigation, route}) => {
    //console.log(JSON.stringify(route));
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);

    const checkout = async () =>{
        //TODO: kolla att obligatoriska fält är ifyllda
        var result = Object.assign({}, route.params)
        result.stops.push(location);
        
        const userID = await storage.getDataString("userID");
        
        var data = {
            header: result.type,
            body: result,
            cost: price
        }

        await request.requester.newRequest(userID, result.type, data);
        navigation.navigate("Receipt"); 
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
            <View style={rs.moveOnContainer}>
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