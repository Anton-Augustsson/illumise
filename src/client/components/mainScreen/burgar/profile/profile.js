import { AppContext } from '../../../AppContext';
import CustomButton from '../../../customComponents/customButton';
import React, { useContext, useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Localization } from '../../../../modules/localization';
import ms from '../../../mainStyles/ms';
import FloatingInput from '../../../customComponents/Inputs/floatingInput';
import account from '../../../../modules/client-communication/account';
import UserProfile from '../../../customComponents/userProfile';
import review from '../../../../modules/client-communication/review';

const updateProfile = async (firstName, lastName, getState, refresh, setState) =>{    
    let credentials = {
            "firstName":getState().user.firstName,
            "lastName":getState().user.lastName,
            "email":getState().user.email,
            "token":getState().user.password
    };
    var newUser = getState().user;
    if(firstName != ""){
        credentials.firstName = firstName;
        newUser.firstName = firstName;
    }
    if(lastName != ""){
        credentials.lastName = lastName;
        newUser.lastName = lastName;
    }
    setState(newUser);
    
    await account.changeCredentials(getState().user._id, credentials);
    refresh();
}

const ProfileScreen = ({navigation}) => 
{
    const { getState, signOut, setState} = useContext(AppContext); 
    const [firstName, setFirstName] = useState(getState().user.firstName);
    const [lastName, setLastName] = useState(getState().user.lastName);
    const [hasUpdated, setUpdated] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [rating, setRating] = useState({averageRating: 0, numRatings: 0});

    const refresh = () =>{
        setFirstName(getState().user.firstName);
        setLastName(getState().user.lastName);
        setUpdated(hasUpdated+1);
    }

    useEffect(() => {
        const init = async () => {
            try 
            {
                
            } 
            catch(error) 
            {
                console.log(error);
            }
        }
        init();
    },[hasUpdated]);

    useEffect(()=> {
        const init = async () => {
            try {
                let result = await review.getRating(getState().user._id, true);
                if (result) setRating(result);
            } catch(error) {
                console.log(error)
            }
        }
        init();
    }, []);

    return (
        <ScrollView style={bs.container}>
            {getState().user == null ? <Text>{Localization.getText("loading")}</Text> 
            : 
            <>
                <UserProfile
                    isUser={true}
                    user={getState().user}
                    rating={rating}
                    onPress={()=>navigation.navigate("SeeReviews", {...getState().user, getProvider: true})}
                />
            </>
            }
            
            <Text style={[ms.h2, {marginTop:20, marginLeft: 20}]}>{Localization.getText("update")}</Text>
            <View style={bs.input}>
                <FloatingInput 
                    placeholder={Localization.getText("foreName")}
                    onChangeText={
                        text => {
                            setFirstName(text);
                            if(firstName === "" && lastName === ""){
                                setDisabled(true);
                            }else{
                                setDisabled(false);
                            }
                        }}
                    value={firstName}
                    />
                <FloatingInput 
                    placeholder={Localization.getText("afterName")}
                    onChangeText={text => {
                        setLastName(text);
                        if(firstName === "" && lastName === ""){
                            setDisabled(true);
                        }else{
                            setDisabled(false);
                        }
                    }}
                    value={lastName}
                    />
            </View>

            <View style={ms.container}>
                <CustomButton
                    style={ms.button}
                    title={Localization.getText("update")}
                    onPress={()=>updateProfile(firstName, lastName, getState, refresh, setState)}
                    disabled={disabled}
                />
            </View>

            <View style={ms.container}>
                <CustomButton
                    style={bs.cancelButton}
                    title={Localization.getText("logout")}
                    onPress={()=>signOut()}
                />
            </View>
        </ScrollView>
    );
}


const bs = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:10
    },
    time:{
        position:"absolute",
        right:0,
        top:0,
        marginTop:5,
        marginRight:5,
        fontWeight:"bold",
        color:"grey",
    },
    profileContainer: {
        alignSelf:"center",
        marginBottom:20,
        marginTop:20,
    },
    profileImg: {
        height:180,
        width:180,
        borderRadius:90,
        marginBottom:6,
    },
    profileName: {
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:22,
    },
    profileUpdate: {
        alignSelf:"center",
        marginTop:10,
        fontSize:15,
    },
    input:{
        marginLeft:20,
        marginRight:20
    },
    cancelButton:{
        justifyContent:"center",
        alignItems:"center",
        minWidth:150,
        height:50,
        borderRadius:15,
        backgroundColor:'red',
    },
});

export default ProfileScreen;