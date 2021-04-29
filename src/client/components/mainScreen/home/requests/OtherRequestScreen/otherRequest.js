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

const OtherRequestScreen = ({navigation}) => {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [price, setPrice] = useState(0);

    const finishOrder = async() =>{
        var data = {
            header: "other",
            body: {
                type: "other",
                stops: [location],
                title: title,
                info: info,
                price: price
            },
            cost: price
        }

        var userID = await storage.getDataString("userID");
        await request.requester.newRequest(userID, data.header, data);
        navigation.navigate("Receipt", );
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
            <View style={rs.moveOnContainer}>
                <IconButton onPress={finishOrder}/>
            </View>
        </View>
    );
}

export default OtherRequestScreen;