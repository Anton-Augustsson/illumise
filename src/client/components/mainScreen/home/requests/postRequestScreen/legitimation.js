import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet, Switch} from 'react-native';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization'
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';
import IconButton from '../../../../customComponents/iconButton';


const LegitimationScreen = ({navigation, route}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [location, setLocation] = useState("");
    
    const nextScreen = () => {
        var result = Object.assign({}, route.params);
        if(isEnabled){ 
            result.stops.unshift(location);
        }
        navigation.navigate("Deliver", result);
    } 

    //;//{Localization.getText("legitimationPrompt")}
    return (
        <View style={{flex:1}}>
            <View style={rs.content}>
                <View style={{
                    flexDirection:'row',
                    alignItems: 'center',
                }}>
                    <Text style={[ms.h3,{
                        width:"80%",
                        paddingRight:10,
                    }]}>{Localization.getText("legitimationPrompt")}</Text>
                    <Switch
                        trackColor={{ false: "#666666", true: "#00E823" }}
                        thumbColor={isEnabled ? "green" : "grey"}
                        ios_backgroundColor="#666666"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={isEnabled ? {display:"flex"} : {display:"none"}}>
                    <Text style={[ms.h3, {marginTop: 50}]}>{Localization.getText("enterPickupLoc")}</Text>
                    <GooglePlaces
                        placeholder={Localization.getText("deliveryAddress")}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            setLocation({adress: data.description, location: details.geometry.location});
                        }}
                    />
                </View>
            </View>
            <View style={ms.moveOnContainer}>
                <IconButton onPress={nextScreen} />
            </View>
        </View>
    );
}

export default LegitimationScreen;