import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ms from "../../../mainStyles/ms";
import { Localization } from '../../../../modules/localization';
import { FontAwesome } from '@expo/vector-icons'; 
import { useState } from 'react';
import FloatingInput from '../../../customComponents/Inputs/floatingInput';
import SamaritButton from '../../../customComponents/samaritButton';

const ReviewScreen = ({data, nav, setComplete}) => 
{
    const [stars, setStars] = useState(1);
    const [text, setText] = useState("");
    const numStars = 5;

    const sendReview = async () =>
    {
        //let result = await review.add(data.fromID, data.toID, data.requestID, text, stars, data.fromID, data.toProvider);
        //console.log("sendReview", result);
        setComplete(true);
        nav.goBack();
    }

    return (
        <View style={{flex:1}}>
            <View style={{alignItems:'center'}}>
                <Text style={ms.h2}>{Localization.getText("howWasExperience")}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop:10}}>
                {
                    [...new Array(numStars)].map((_,index) => (
                        <FontAwesome name={index < stars ? "star" : "star-o"}
                                     key={index.toString()}
                                     size={50} 
                                     style={ms.star} 
                                     onPress={() => setStars(index + 1)}
                        />
                    ))
                }
            </View>
            <View style={rs.content}>
                <FloatingInput 
                    onChangeText={text=>setText(text)}
                    placeholder={Localization.getText("descExperience")}
                    multiline={true}
                    value={text}
                />

                <View style={rs.moveOnContainer}>
                    <SamaritButton
                        title={Localization.getText("send")}
                        onPress={sendReview}
                    />
                </View>
            </View>
            
        </View>
    );
}

const rs = StyleSheet.create({
    content: {
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:20,
        paddingTop:20
    },
    moveOnContainer: {
        paddingTop: 20,
        paddingBottom: 80,
    },
});

export default ReviewScreen;