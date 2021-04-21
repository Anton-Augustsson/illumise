import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet, Switch} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Localization} from '../../../../../modules/localization'
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';


const LegitimationScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{flex:1}}>
            <CustomHeader
                    title={Localization.getText("postAndPackage")}
                    nav={navigation}
                />
            <View style={styles.container}>
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
                    <Text style={[ms.h3, {marginTop: 50}]}>{Localization.getText("enterPickupLoc")}</Text>
                    <GooglePlaces
                        placeholder={Localization.getText("deliveryAddress")}
                        onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        }}
                    />

                    <CustomButton 
                        style={ms.button}
                        styleText={{fontWeight:"bold"}}
                        title={Localization.getText("continue")}
                        onPress={()=>navigation.navigate("Deliver")}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
    },
    map: {
      width: "100%",
      height: "70%",
      marginBottom: 20,
    },
  });

export default LegitimationScreen;