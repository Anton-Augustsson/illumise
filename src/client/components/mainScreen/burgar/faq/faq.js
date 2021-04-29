import React from 'react';
import { View } from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';

const FaqScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("faq")}
                nav={navigation}
            />
        </View>
    );
}

export default FaqScreen;