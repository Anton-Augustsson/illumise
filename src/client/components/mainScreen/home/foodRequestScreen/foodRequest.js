import React, {useState, useRef} from 'react';
import { Text, View, Image, TextInput, Button, Animated, TouchableWithoutFeedback} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomButton from "../../../customComponents/customButton";
import CustomHeader from "../../../customComponents/customHeader"
import CustomListItem from "../../../customComponents/customListItem"
import ms from '../../../mainStyles/ms';
import fs from "./foodStyles";
import BottomSheet from "reanimated-bottom-sheet";

//TODO vi måste ha någon sorts uuid generator



const FoodRequestScreen = ({navigation}) => {
    //TODO ID MÅSTE VARA EN STRÄNG
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

    const renderContent = () => (
        <View
            style={fs.bsContentContainer}
        >
            <Text>Swipe down to close</Text>
        </View>
    );

    const renderHeader = () => (
        <View style={fs.bsHeaderContainer}>
            <View style={fs.bsDrawIndicator}></View>
        </View>
    );

    var fall = new Animated.Value(1);
    console.log(fall);
    const sheetRef = useRef(null);   


    return (
        <View style={{flex:1}}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[300, 0, 0]}
                initialSnap={1}
                renderContent={renderContent}
                renderHeader={renderHeader}
                enabledContentGestureInteraction={false}
                callbackNode={fall.setValue(1)}
            />
            <CustomHeader
                title="Mat"
                nav={navigation}
            />
            <TouchableWithoutFeedback 
                onPress={()=>sheetRef.current.snapTo(1)}
                touchSoundDisabled={true}
            >
            <Animated.View style={[fs.content,
                {opacity: Animated.add(0.2, Animated.multiply(fall, 1.0))}]
            }>
                
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
                        onPress={() => sheetRef.current.snapTo(0)}
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

            </Animated.View>
        </TouchableWithoutFeedback>
    </View>
    );
}


export default FoodRequestScreen;