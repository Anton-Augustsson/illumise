import { AppContext } from '../../../AppContext';
import CustomButton from '../../../customComponents/customButton';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';
import ms from '../../../mainStyles/ms';
import FloatingInput from '../../../customComponents/Inputs/floatingInput';
import account from '../../../../modules/client-communication/account';
import storage from '../../../../modules/localStorage/localStorage';
import colors from '../../../../components/mainStyles/colors'


const ProfilePicture = ({getState}) => 
{
    return (
        <View style={bs.profileContainer}>
            <Image
                style={bs.profileImg}
                source={{uri: getState().user.picture}}
            />
        </View>
    );
}

const updateProfile = async (firstName, lastName, email) =>{
    const userID = await storage.getDataString("userID");
    console.log(userID);
    //TODO: kolla om något fält är tomt och isåfall ta det gamla värdet
    const credentials = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "token":"Nej" //<- Token ska inte ändras
    }
    account.changeCredentials(userID, credentials);
}

const ProfileScreen = ({navigation}) => 
{
    const { getState, signOut } = useContext(AppContext); 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
       
    return (
        <>
        <CustomHeader
                title={Localization.getText("profile")}
                nav={navigation}
            />
        
        <ScrollView style={{flex:1}}>
            
            <ProfilePicture getState={getState}/>

            <Text style={bs.profileName}>Steffe</Text>
            <Text style={bs.profileMail}>steffson@gmail.com</Text>
            <Text style={[ms.h2, {marginTop:40, marginLeft: 20}]}>Uppdatera profil:</Text>
            <View style={bs.input}>
                <FloatingInput 
                    placeholder={Localization.getText("foreName")}
                    onChangeText={text => {setFirstName(text)}}
                    value={firstName}
                    />
                <FloatingInput 
                    placeholder={Localization.getText("afterName")}
                    onChangeText={text => {setLastName(text)}}
                    value={lastName}
                    />
                <FloatingInput 
                    placeholder={Localization.getText("email")}
                    onChangeText={text => {setEmail(text)}}
                    value={email}
                    />
            </View>

            <View style={ms.container}>
                <CustomButton
                    style={ms.button}
                    title={Localization.getText("update")}
                    onPress={()=>updateProfile(firstName, lastName, email)}
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
        </>
    );
}


const bs = StyleSheet.create({
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
    profileMail: {
        alignSelf:"center",
        marginTop:10,
        fontSize:15,
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
        marginTop:'10%'
    },
});

export default ProfileScreen;