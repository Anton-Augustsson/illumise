import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Localization } from '../../../../modules/localization';


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

{
    "id": "4",
    "question": Localization.getText("faqQuestion4"),
    "answer": Localization.getText("faqAnswer4")
},
]

const FaqScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <FlatList style={{padding:10}}
                data={QUESTIONS}
                renderItem={({item})=>faqList(item)}
                keyExtractor={(item)=>item.id}
                ListHeaderComponent={()=>
                    <Text style={{fontSize: 20}}>
                        {Localization.getText("faqText1") + "\n"}
                    </Text>
                }
                ListFooterComponent={()=>
                <View style={styles.otherInfo}>
                    <Text>{Localization.getText("faqText2")}</Text>
                    <Text>{Localization.getText("faqContactInfo")}</Text>
                </View>
                }
            />
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

const styles = StyleSheet.create({
    otherInfo: {
        borderWidth: 1, 
        padding:10, 
        marginBottom:20,
        borderRadius: 15
    }
});

export default FaqScreen;