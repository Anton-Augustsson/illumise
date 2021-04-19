import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";

const SettingsScreen = ({navigation}) => {
    console.log("hJEJJEJ");
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title="Inställningar"
                nav={navigation}
            />
        </View>
    );
}

export default SettingsScreen;