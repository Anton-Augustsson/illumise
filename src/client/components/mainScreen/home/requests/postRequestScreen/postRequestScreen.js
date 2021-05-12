import React, {useState} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization'
import IconButton from '../../../../customComponents/iconButton';
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';


const PostRequestScreen = ({navigation}) => {
    const [location, setLocation] = useState("");
    const [refCode, setRefCode] = useState("");
    const [otherInfo, setOtherInfo] = useState("");

    const nextScreen = () =>{
        var result = {
            type: "post",
            stops: [location],
            refCode: refCode, 
            info: otherInfo
        }
        setRefCode("");
        setOtherInfo("");
        navigation.navigate("Legitimation", result);
    }

    return (
        <View style={{flex:1}}>
            <View style={rs.content}>
                <Text style={ms.h3}>{Localization.getText("enterPostOffice")}</Text>
                <GooglePlaces
                    placeholder={Localization.getText("deliveryAddress")}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setLocation({adress: data.description, location: details.geometry.location});
                    }}
                />

                    <Text style={ms.h3}>{Localization.getText("enterPackageRef")}</Text>
                    <FloatingInput 
                        placeholder={Localization.getText("refCode")}
                        onChangeText={(text)=>setRefCode(text)}
                        keyboardType="number-pad"
                    />
    
                    <Text style={ms.h3}>{Localization.getText("otherInfo")}</Text>
                    <FloatingInput 
                        placeholder={Localization.getText("otherInfo")}
                        onChangeText={(text)=>setOtherInfo(text)}
                    />
            </View>
            <View style={ms.moveOnContainer}>
                <IconButton onPress={nextScreen}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
      width: "100%",
      height: "70%",
      marginBottom: 20,
    },
  });

export default PostRequestScreen;