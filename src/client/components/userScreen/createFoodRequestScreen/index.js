import React, {useState} from 'react';
import { Text, View, Image, TextInput, Button, Switch, TouchableOpacity, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomButton from "../../customComponents/customButton";
import CustomHeader from "../../customComponents/customHeader"
import CustomListItem from "../../customComponents/customListItem"
import ms from '../../mainStyles/ms';
import fs from "./foodStyles";

//TODO vi måste ha någon sorts uuid generator



const createFoodRequestScreen = ({navigation}) => {
    const [id, setId] = useState(0);

    const createFoodRequest = (addr, list) =>{
        navigation.navigate("FoodRequestDone", {id: 0, type: 'food', delivAddress: addr, shoppingList: list});
    }

    const [textDel, setTextDel] = useState("");
    const onChangeDel = textValue => setTextDel(textValue); 

    const [textArticle, setTextArticle] = useState('');
    const onChangeArticle = textValue => setTextArticle(textValue);

    const [items, setItems] = useState([]);

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        })
    }

    const addItem = (textArticle) => {
        setItems(prevItems => {
            setId(id+1);
            return [{id:id, text: textArticle},...prevItems]
        })
    }

    return (
        <View style={{flex:1}}>
            <CustomHeader
                title="Mat"
                nav={navigation}
            />
            <View style={fs.content}>
                
                <View style={{flex:1}}>
                    <Text style={ms.h3}>Leverera till:</Text>
                    <TextInput 
                        style={fs.desc}
                        placeholder="Adress"
                        onChangeText={onChangeDel}
                    />

                    <View style={{marginTop:25, marginBottom:25}}>
                        <Text style={ms.h3}>
                            Lägg till en vara:
                        </Text>
                        <TextInput
                            style={fs.desc}
                            placeholder="Beskriv vara"
                            onChangeText={onChangeArticle}
                        />
                        <CustomButton
                        style={ms.button}
                        title="Lägg till vara"
                        styleText={{fontWeight:"bold"}}
                        onPress={addItem}
                        arg1={textArticle}
                        />
                    </View>

                    <Text style={ms.h3}>Inköpslista:</Text>
                    <FlatList
                        data={items}
                        renderItem={({item}) => <CustomListItem id={item.id} text={item.text} deleteItem={deleteItem}/>}
                        keyExtractor={(item) => item.id}
                    />   
                </View>

               

                <View style={fs.orderContainer}>
                    <CustomButton
                        style={ms.button}
                        styleText={{fontWeight:"bold"}}
                        title="Slutför beställning"
                        onPress={createFoodRequest}
                        arg1={textDel}
                        arg2={items}
                    />
                </View>
            </View>
        </View>
    );
}

export default createFoodRequestScreen;