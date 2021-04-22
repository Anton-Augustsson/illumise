import React from 'react';
import { View } from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';

const ProfileScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("profile")}
                nav={navigation}
            />
        </View>
    );
}

export default ProfileScreen;