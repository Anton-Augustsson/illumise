import React from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { Localization } from '../../../../modules/localization';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";

const QUESTIONS = [
{
    "id": "1",
    "question": Localization.getText("faqQuestion1"),
    "answer": Localization.getText("faqAnswer1")
},

{
    "id": "2",
    "question": Localization.getText("faqQuestion2"),
    "answer": Localization.getText("faqAnswer2")
},

{
    "id": "3",
    "question": Localization.getText("faqQuestion3"),
    "answer": Localization.getText("faqAnswer3")
},
]

const FaqScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader
                title={Localization.getText("faq")}
                nav={navigation}
            />
            <View style={ms.itemContainer}><Text style={{fontSize: 15}}>{Localization.getText("faqText1") + "\n"}</Text></View>

                <FlatList style={{padding:10}}
                    data={QUESTIONS}
                    renderItem={({item})=>faqList(item)}
                    keyExtractor={(item)=>item.id}
                />
            <View style={{borderWidth: 2}}>
                <Text>Finns några övriga frågor?</Text>
                <Text>Kontakta gärna oss på mail eller telefon: </Text>
                <Text>Mail: illumise420@gmail.com</Text>
                <Text>Telefon: 073XXXXXXX</Text>
            </View>
        </View>
    );
}

const faqList = (item) => {
    return (
        <View>
                <Text style={{fontSize: 25}}>{"\u2022 " + item.question}</Text>
                <Text style={{fontSize: 18}}>{item.answer + "\n"}</Text>
                
        </View>
    );

}

export default FaqScreen;