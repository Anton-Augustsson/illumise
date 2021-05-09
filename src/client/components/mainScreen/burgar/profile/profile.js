import { AppContext } from '../../../AppContext';
import CustomButton from '../../../customComponents/customButton';
import React, { useContext, useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';
import ms from '../../../mainStyles/ms';
import FloatingInput from '../../../customComponents/Inputs/floatingInput';
import account from '../../../../modules/client-communication/account';
import storage from '../../../../modules/localStorage/localStorage';
import colors from '../../../../components/mainStyles/colors'


const ProfilePicture = ({getState}) => 
{
    //TODO: Ej anpassat för facebook. Kommer få error
    return (
        <View style={bs.profileContainer}>
            <Image
                style={bs.profileImg}
                source={{uri: getState().user.picture}}
            />
        </View>
    );
}

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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [user, setUser] = useState();
    const [hasUpdated, setUpdated] = useState(0);

    

    const refresh = () =>{
        setFirstName("");
        setLastName("");
        setUpdated(hasUpdated+1);
    }

    useEffect(() => {
        const init = async () => {
            try 
            {
                setUser(getState().user);
            } 
            catch(error) 
            {
                console.log(error);
            }
        }
        init();
    },[hasUpdated]);


    return (
        <>
        <CustomHeader
                title={Localization.getText("profile")}
                nav={navigation}
            />
        
        <ScrollView style={{flex:1}}>
            
            <ProfilePicture getState={getState}/>

            {user == null ? <Text>{Localization.getText("loading")}</Text> 
            : 
            <>
                <Text style ={bs.profileName}>{user.firstName + " " + user.lastName}</Text>
                <Text style={bs.profileMail}>{user.email}</Text>
            </>
            }
            
            <Text style={[ms.h2, {marginTop:40, marginLeft: 20}]}>{Localization.getText("update")}</Text>
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
            </View>

            <View style={ms.container}>
                <CustomButton
                    style={ms.button}
                    title={Localization.getText("update")}
                    onPress={()=>updateProfile(firstName, lastName, getState, refresh, setState)}
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
    },
});

export default ProfileScreen;