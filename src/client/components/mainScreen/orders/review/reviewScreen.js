import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ms from "../../../mainStyles/ms";
import { Localization } from '../../../../modules/localization';
import { FontAwesome } from '@expo/vector-icons'; 
import { useState } from 'react';
import FloatingInput from '../../../customComponents/Inputs/floatingInput';
import SamaritButton from '../../../customComponents/samaritButton';

const ReviewScreen = ({route}) => 
{
    const [star1, setStar1] = useState(["star", "#FFC52B"]);
    const [star2, setStar2] = useState(["star-o", "black"]);
    const [star3, setStar3] = useState(["star-o", "black"]);
    const [star4, setStar4] = useState(["star-o", "black"]);
    const [star5, setStar5] = useState(["star-o", "black"]);
    const [review, setReview] = useState(1);
    const [text, setText] = useState("");

    const star1review = () => {
        setStar2(["star-o", "black"]);
        setStar3(["star-o", "black"]);
        setStar4(["star-o", "black"]);
        setStar5(["star-o", "black"]);
        setReview(1);
    }

    const star2review = () => {
        setStar2(["star", "#FFC52B"]);
        setStar3(["star-o", "black"]);
        setStar4(["star-o", "black"]);
        setStar5(["star-o", "black"]);
        setReview(2); 
    }

    const star3review = () => {
        setStar2(["star", "#FFC52B"]);
        setStar3(["star", "#FFC52B"]);
        setStar4(["star-o", "black"]);
        setStar5(["star-o", "black"]);
        setReview(3);
    }

    const star4review = () => {
        setStar2(["star", "#FFC52B"]);
        setStar3(["star", "#FFC52B"]);
        setStar4(["star", "#FFC52B"]);
        setStar5(["star-o", "black"]);
        setReview(4);
    }

    const star5review = () => {
        setStar2(["star", "#FFC52B"]);
        setStar3(["star", "#FFC52B"]);
        setStar4(["star", "#FFC52B"]);
        setStar5(["star", "#FFC52B"]);
        setReview(5);
    }

    const sendReview = () =>
    {
        //TODO
        
    }

    return (
        <View style={{flex:1}}>
            <View style={{alignItems:'center'}}>
                <Text style={ms.h2}>{Localization.getText("howWasExperience")}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop:10}}>
                <FontAwesome name={star1[0]} size={50} color={star1[1]} style={rs.star} onPress={() => star1review()}/>
                <FontAwesome name={star2[0]} size={50} color={star2[1]} style={rs.star} onPress={() => star2review()}/>
                <FontAwesome name={star3[0]} size={50} color={star3[1]} style={rs.star} onPress={() => star3review()}/>
                <FontAwesome name={star4[0]} size={50} color={star4[1]} style={rs.star} onPress={() => star4review()}/>
                <FontAwesome name={star5[0]} size={50} color={star5[1]} style={rs.star} onPress={() => star5review()}/>
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
    star: {
        margin: 5
    },
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