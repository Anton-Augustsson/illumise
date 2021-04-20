import React, {useState, useRef} from 'react';
import { Text, View, TextInput, Animated, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import CustomButton from "../../../../customComponents/customButton";
import CustomHeader from "../../../../customComponents/customHeader"
import CustomListItem from "../../../../customComponents/customListItem"
import ms from '../../../../mainStyles/ms';
import rs from "../requestStyle";
import BottomSheet from "reanimated-bottom-sheet";

//TODO vi måste ha någon sorts uuid generator


const FoodRequestScreen = ({navigation}) => {
    //TODO ID MÅSTE VARA EN STRÄNG
    const [id, setId] = useState("0");

    const createFoodRequest = (addr, list) =>{
        navigation.navigate("Deliver", {id: "0", type: 'food', delivAddress: addr, shoppingList: list});
    }

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
            setId((id+1).toString());
            return [{id:id, text: textArticle},...prevItems]
        })
    }

    const renderContent = () => (
        <View style={rs.bsContentContainer}>
            <Text style={ms.h3}>
                Lägg till en vara:
            </Text>
            <TextInput
                style={rs.desc}
                placeholder="Beskriv vara"
                onChangeText={onChangeArticle}
            />
            <CustomButton
                style={ms.button}
                title="Lägg till vara"
                styleText={{fontWeight:"bold"}}
                onPress={() => addItem(textArticle)}
                arg1={textArticle}
            />
            <CustomButton
                style={ms.cancelButton}
                title="Cancel"
                styleText={{fontWeight:"bold"}}
                onPress={() => sheetRef.current.snapTo(1)}
                arg1={textArticle}
            />
        </View>
    );

    const renderHeader = () => (
        <View style={rs.bsHeaderContainer}>
            <View style={rs.bsDrawIndicator}></View>
        </View>

    );

    var fall = new Animated.Value(1);
    console.log(fall);
    const sheetRef = useRef(null);   


    return (
        <View style={{flex:1}}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={["65%", 0, 0]}
                initialSnap={1}
                renderContent={renderContent}
                renderHeader={renderHeader}
                enabledContentGestureInteraction={false}
                callbackNode={fall.setValue(1)}
            />
            <CustomHeader
                title="Handla"
                nav={navigation}
            />
            
            <Animated.View style={[rs.content,
                {opacity: Animated.add(0.2, Animated.multiply(fall, 1.0))}]
            }>
                
                <View style={{flex:1}}>
                    <Text style={ms.h3}>Inköpslista:</Text>
                    <FlatList
                        data={items}
                        renderItem={({item}) => <CustomListItem id={item.id} text={item.text} deleteItem={deleteItem}/>}
                        ListFooterComponent={()=>
                                                <CustomButton
                                                    style={ms.button}
                                                    title="Lägg till vara"
                                                    styleText={{fontWeight:"bold"}}
                                                    onPress={() => sheetRef.current.snapTo(0)}
                                                    arg1={textArticle}
                                                />
                                            }
                        keyExtractor={(item) => item.id}
                    />   
                </View>

                <View style={rs.orderContainer}>
                    <CustomButton
                        style={ms.button}
                        styleText={{fontWeight:"bold"}}
                        title="Gå vidare"
                        onPress={createFoodRequest}
                        arg2={items}
                    />
                </View>

            </Animated.View>
        </View>
    );
}


export default FoodRequestScreen;