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
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");

    const nextScreen = () =>{
        var data = {
            type: "other",
            stops: [],
            title: title,
            info: info,
        }

        navigation.navigate("Deliver", data);
    }
        console.log(navigation);
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
            </View>
            <View style={ms.moveOnContainer}>
                <IconButton onPress={nextScreen}/>
            </View>
        </View>
    );
}

export default OtherRequestScreen;