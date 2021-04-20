import React, {useState} from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";

const DeliverScreen = ({navigation}) => {
    const [textDel, setTextDel] = useState("");
    const onChangeDel = textValue => setTextDel(textValue); 

    return (
        <View style={{flex:1}}>

            <CustomHeader
                title="Leverans"
                nav={navigation}
            />
            <Text style={ms.h3}>Leverera till:</Text>
            <TextInput 
                style={rs.desc}
                placeholder="Adress"
                onChangeText={onChangeDel}
            />
            <CustomButton
                style={ms.button}
                styleText={{fontWeight:"bold"}}
                title="Slutför beställning"
            />
        </View>
    );
}

export default DeliverScreen;