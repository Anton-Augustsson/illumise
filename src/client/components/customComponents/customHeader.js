import React from 'react';
import {Text, View} from 'react-native';
import CustomButton from "./customButton";
import ms from "../mainStyles/ms";

const CustomHeader = (props) => {
    return (
        <View style={ms.header}>
            <CustomButton
                style={ms.headerBack}
                title="Gå tillbaka"
                onPress={() => props.nav.goBack()}
            />
            <Text style={ms.headerTitle}>{props.title}</Text>
        </View>
    );
}

export default CustomHeader;