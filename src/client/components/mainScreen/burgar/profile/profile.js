import React from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";

const ProfileScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title="Profil"
                nav={navigation}
            />
        </View>
    );
}

export default ProfileScreen;