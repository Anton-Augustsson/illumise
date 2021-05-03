import React from 'react';
import { View } from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';
import CustomMap from '../../../customComponents/customMap';

const FaqScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("faq")}
                nav={navigation}
            />
            <CustomMap  style={{flex: 1}}
                        onMount={(region) => 
                        {
                            return [{
                                latitude: region.latitude,
                                longitude: region.longitude,
                                title: "Me",
                                description: "Its you"
                            }];
                        }}
                        onUpdate={(region, markers) =>
                        {
                            markers.forEach((marker) => 
                            {
                                marker.latitude = region.latitude;
                                marker.longitude = region.longitude;
                            });
                            return markers;
                        }}
            />
        </View>
    );
}

export default FaqScreen;