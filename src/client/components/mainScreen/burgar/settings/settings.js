import React, {useContext} from 'react';
import { View } from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomButton from '../../../customComponents/customButton';
import CustomHeader from '../../../customComponents/customHeader';
import ms from '../../../mainStyles/ms';
import {AppContext} from "../../../AppContext";

const SettingsScreen = ({navigation}) => {

    const { signOut } = useContext(AppContext); 

    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("options")}
                nav={navigation}
            />
            <View style={ms.container}>
                <CustomButton
                    style={ms.cancelButton}
                    title={Localization.getText("logout")}
                    onPress={()=>signOut()}
                />
            </View>

        </View>
    );
}

export default SettingsScreen;