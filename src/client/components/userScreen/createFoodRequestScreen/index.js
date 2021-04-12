import React from 'react';
import { Text, View, Image, TextInput} from 'react-native';
import fs from "./foodStyles"


const createFoodRequestScreen = ({navigation}) => {
    return (
        <View>
            <Text>FOOOOOOOOOOODST</Text>
            <TextInput 
            style={fs.desc}
            placeholder="banan"
            multiline={true}
            />
        </View>
    );
}

export default createFoodRequestScreen;