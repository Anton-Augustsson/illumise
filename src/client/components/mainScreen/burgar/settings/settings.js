import React from 'react';
import { Alert, Button, View } from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';
import { Restart } from 'fiction-expo-restart';
import storage from '../../../../modules/localStorage/localStorage';

const SettingsScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("options")}
                nav={navigation}
            />
            <Button
                title = {Localization.getText("selectLang")}
                onPress = { () => 
                {
                    Alert.alert(Localization.getText("selectLang"), 
                    `Current Lang: ${Localization.lang}`,
                    Localization.langs.map((lang) => 
                    {
                        return { text: lang, onPress: async () => 
                        {
                            if (lang != Localization.lang)
                            {
                                await storage.storeDataObject("lang", lang);
                                Restart();
                            }
                        }};
                    }));
                }}
            />
        </View>
    );
}

export default SettingsScreen;