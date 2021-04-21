import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Localization} from '../../../../../modules/localization'
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';


const DeliverScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("deliveryInfo")}
                nav={navigation}
            />
            <View style={styles.container}>
                
                    <Text style={ms.h3}>{Localization.getText("enterDelivAddress")}</Text>
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
                        title={Localization.getText("finishOrder")}
                        onPress={()=>navigation.navigate("Receipt")}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:10,
    },
    map: {
      width: "100%",
      height: "70%",
      marginBottom: 20,
    },
  });

export default DeliverScreen;