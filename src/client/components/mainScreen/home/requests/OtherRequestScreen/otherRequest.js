import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization';
import IconButton from "../../../../customComponents/iconButton";
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import GooglePlaces from "../../../../customComponents/Inputs/googlePlaces";


const OtherRequestScreen = ({navigation}) => {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");

    const finishOrder = () =>{
        var result = {
            type: "other",
            stops: [location],
            title: title,
            otherInfo: info,
        }
        navigation.navigate("Receipt", result);
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
            </View>
            <View style={rs.moveOnContainer}>
                <IconButton onPress={finishOrder}/>
            </View>
        </View>
    );
}

export default OtherRequestScreen;