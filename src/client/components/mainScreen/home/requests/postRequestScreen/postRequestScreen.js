import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import {Localization} from '../../../../../modules/localization'


const PostRequestScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                    title={Localization.getText("postAndPackage")}
                    nav={navigation}
                />
            <View style={styles.container}>
               
                    <Text style={ms.h3}>{Localization.getText("enterPackageRef")}</Text>
                    <TextInput style={rs.desc} multiline placeholder={Localization.getText("refCode")}/> 

                    <Text style={ms.h3}>{Localization.getText("otherInfo")}</Text>
                    <TextInput style={rs.desc} multiline placeholder={Localization.getText("otherInfo")}/> 

                    <Text style={ms.h3}>{Localization.getText("enterPostOffice")}</Text>
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
                        onPress={()=>navigation.navigate("Legitimation")}
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

export default PostRequestScreen;