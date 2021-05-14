import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableHighlight } from 'react-native';
import review from '../../modules/client-communication/review';
import CustomButton from "../customComponents/customButton";
import ReviewStars from './reviewStars';

const AcceptHeader = ({navigation, userObject, requestID, zIndex = 1, acceptTitle, 
                       onButtonPress, buttonStyle, buttonDisabled, 
                       centerButtonEnabled = false}) => {
    
    const [rating, setRating] = useState({averageRating: 0, numRatings: 0});
    useEffect(() => 
    {
        const init = async () => 
        {
            let ratings = await review.getRating(userObject._id, !userObject.isCreator);
            if (ratings) setRating(ratings);
        }
        init();
    },[]);

    const disabled = buttonDisabled ? buttonDisabled : false;
    return(
        <>
        <View style={[styles.topContainer, {zIndex:zIndex}]}>
            <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate("SeeReviews", userObject);
                }}
                style={styles.providerContainer}
            >
                {userObject.picture ?
                    <Image
                        style={styles.profileImg}
                        source={{uri: userObject.picture}}
                    />
                    :null
                }
                <View style={styles.nameRatingContainer}>
                    <Text>{userObject.firstName? `${userObject.firstName} ${userObject.lastName}` : ""}</Text>
                    <ReviewStars stars={rating.averageRating}/>
                </View>
            </TouchableOpacity>
            

            <CustomButton
                title={acceptTitle}
                style={[disabled ? styles.buttonDisabled : styles.button, buttonStyle]}
                styleText={styles.buttonText}
                onPress={onButtonPress}
                disabled={disabled}
            />
        </View>
        {centerButtonEnabled ? 
            <View style={styles.centerContainer}>
                <TouchableHighlight 
                    style={styles.centerButton}
                    onPress={()=>navigation.navigate("MarketItem", {requestID: requestID, isCreator: userObject.isCreator})}
                    underlayColor="lightgrey"
                >
                    <Text>Visa order</Text>
                </TouchableHighlight>
            </View>
         : null}
        </>
        )
    }

    export default AcceptHeader;

    const styles = StyleSheet.create({
        
        centerContainer: {
            position:"absolute",
            width:"100%",
            justifyContent:"center",
            alignItems:"center",
            zIndex: 1,
            marginTop: 40
        },
        centerButton: {
            backgroundColor: "white",
            padding:6,
            borderRadius:20,
            borderWidth:1,
        },
        topContainer: {
            height:56,
            backgroundColor: "white",
            shadowColor:"black",
            shadowOffset: {
                width:2,
                height:4,
            },
            shadowOpacity:0.8,
            shadowRadius: 2,
            borderBottomWidth: 1,
            flexDirection:"row",
            alignItems:"center",
            padding:10,
            justifyContent:"space-between",
        },
        button: {
            padding:8,
            backgroundColor:"#00CC00",
            borderRadius:10,
        },
        buttonText: {
            color:"black",
        },
        buttonDisabled: {
            padding:8,
            backgroundColor:"#cccccc",
            borderRadius:10,
        },
        providerContainer: {
            flexDirection:"row",
        },
        profileImg: {
            width:35,
            height:35,
            marginRight: 7,
            borderRadius:5
        },
        nameRatingContainer: {
            justifyContent:"space-between",
        }
    });
