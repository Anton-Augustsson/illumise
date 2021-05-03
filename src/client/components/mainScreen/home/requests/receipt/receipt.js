import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import CustomButton from '../../../../customComponents/customButton';
import ms from "../../../../mainStyles/ms";
import { FlatList } from 'react-native-gesture-handler';
import { Localization } from '../../../../../modules/localization';
import storage from '../../../../../modules/localStorage/localStorage';
import request from '../../../../../modules/client-communication/request';

const SuperReceipt = () => 
{
    const getRequest = async () =>{
        var userID = await storage.getDataString("userID");
        const req = await request.requester.getUserRequest("608ae68bdaf97859aba99972", 2);
        console.log(req);
    }
    getRequest();
    //console.log(params);
    return (
        <View style={rs.container}>
            <Text style={ms.h4}>{Localization.getText("address")}</Text>
            <Text>BYT UT</Text>

            <Text style={ms.h4}>{Localization.getText("goods")}</Text>
            <FlatList
                renderItem={({item})=><Text>{item.text}</Text>}
                keyExtractor={(item) => item.id}
            />
            
        </View>
    );
}


const rs = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white",
        shadowColor:"#cccccc",
        shadowOffset: {
            width:2,
            height:4,
        },
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation:6,
        margin:20,
        borderRadius:20,
        padding:20,
    }
}); 

const ReceiptScreen = ({navigation}) => 
{
    //VI KAN FÅ UT INFO GENOM route.params.delivAddress
    return (
        <View style={{flex:1}}>
            <SuperReceipt/>
            <CustomButton
                style={[ms.button, {marginBottom:20,marginLeft:20,marginRight:20}]}
                title={Localization.getText("checkYourOrders")}
                onPress={() => navigation.navigate("Orders")}
            />
        </View>
    );
}

export default ReceiptScreen;