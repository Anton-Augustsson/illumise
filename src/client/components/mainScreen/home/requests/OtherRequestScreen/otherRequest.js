import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization';
import IconButton from "../../../../customComponents/iconButton";
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';

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
                    multiline={true}
                    maxHeight={250}
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