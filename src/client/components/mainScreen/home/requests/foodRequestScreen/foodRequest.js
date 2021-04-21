import React, {useState, useRef} from 'react';
import { Text, View, TextInput, Animated, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from "../../../../customComponents/customButton";
import CustomHeader from "../../../../customComponents/customHeader"
import CartItem from "../../../../customComponents/cartItem"
import ms from '../../../../mainStyles/ms';
import rs from "../requestStyle";
import BottomSheet from "reanimated-bottom-sheet";
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import IconButton from '../../../../customComponents/iconButton';
import {Localization} from "../../../../../modules/localization";

//TODO vi måste ha någon sorts uuid generator

const USUSAL_ARTICLES = [
    {
        "id": "1",
        "text":"Mjölk",
    },{
        "id": "2",
        "text":"Mjöl",
    },{
        "id": "3",
        "text":"Pasta",
    },{
        "id": "4",
        "text":"Ägg",
    },{
        "id": "5",
        "text":"Ris",
    },{
        "id": "6",
        "text":"Banan",
    },{
        "id": "7",
        "text":"Apelsin",
    },{
        "id": "8",
        "text":"Druvor",
    },{
        "id": "9",
        "text":"Babian",
    },{
        "id": "10",
        "text":"Xd",
    },{
        "id": "11",
        "text":"Trash",
    },{
        "id": "12",
        "text":"BBa",
    },{
        "id": "13",
        "text":"NEj",
    },{
        "id": "14",
        "text":"KEFJ",
    },{
        "id": "15",
        "text":"LÖKWKDFJW",
    },{
        "id": "16",
        "text":"IWDJIWDIOJWDIWDJ",
    },
]

const UsualArticles = ({category, data}) => {
    const [expand, setExpand] = useState(true);

    return(
        <View style={rs.usualArticleContainer}>
            <View style={rs.usualArticleInnerContainer}>
                <View style={rs.usualArticleCategory}>
                    <Text style={ms.h4}>{category}</Text>
                </View>
                <View style={[rs.usualArticleItemContainer, 
                    expand ? {height:50} : {}
                ]}>
                {
                    data.map(articles => (
                        <TouchableOpacity key={articles.id} style={rs.usualArticle}>
                                <Text>{articles.text}</Text>
                        </TouchableOpacity>
                    ))
                }
                    
                </View>
            </View>
            <TouchableOpacity
                style={rs.usualArticleExpand} 
                onPress={()=>setExpand(!expand)}>
                <Text style={{color:"white"}}>{expand ? "Expand" : "Shrink"}</Text>
                <MaterialIcons 
                    name={expand ? "keyboard-arrow-down": "keyboard-arrow-up"} 
                    size={24} 
                    color="white" 
                />
            </TouchableOpacity>
        </View>
    );
}

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
            <FlatList
                data={items}
                renderItem={({item}) => <CartItem id={item.id} text={item.text} deleteItem={deleteItem}/>}
                ListEmptyComponent={()=> <Text style={[ms.h3, {alignSelf:"center"}]}>Din inköpslista är tom</Text>}
                keyExtractor={(item) => item.id}
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
        <View style={{overflow:"hidden", paddingTop:5}}>
            <View style={rs.bsHeaderContainer}>
                <View style={rs.bsDrawIndicator}></View>
            </View>
        </View>

    );

    const sheetRef = useRef(null);   

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [otherInfo, setOtherInfo] = useState("");

    return (
        <View style={{flex:1}}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={["65%", 0, 0]}
                initialSnap={1}
                renderContent={renderContent}
                renderHeader={renderHeader}
                enabledContentTapInteraction={false}
            />
            <CustomHeader
                title="Handla"
                nav={navigation}
            />
            <View style={rs.content}>
                <ScrollView style={{flex:1}}>
                    <View style={{paddingLeft:20,paddingRight:20,PaddingBottom:10}}>
                        <View>
                            <Text style={ms.h3}>
                                {Localization.getText("addOwnArticle")}
                            </Text>
                            <FloatingInput onChangeText={text=>setName(text)} 
                                placeholder={Localization.getText("name")}/>
                            <FloatingInput onChangeText={text=>setBrand(text)} 
                                placeholder={Localization.getText("brand")}/>
                            <FloatingInput onChangeText={text=>setOtherInfo(text)} 
                                placeholder={Localization.getText("otherInfo")}/>
                            <CustomButton
                                style={[ms.button,{marginTop:10}]}
                                title="Lägg till vara"
                                styleText={{fontWeight:"bold"}}
                                onPress={() => addItem(textArticle)}
                                arg1={textArticle}
                            />
                        </View>
                        <Text style={ms.h3}>
                            {Localization.getText("proposalForArticles")}
                        </Text>
                        <UsualArticles category="Basvaror" data={USUSAL_ARTICLES}/>
                        <UsualArticles category="Basvaror" data={USUSAL_ARTICLES}/>
                        <UsualArticles category="Basvaror" data={USUSAL_ARTICLES}/>
                        <UsualArticles category="Basvaror" data={USUSAL_ARTICLES}/>
                    </View>
                </ScrollView>
                      

                <View style={rs.moveOnContainer}>
                    <IconButton 
                        title="cart" 
                        onPress={()=>sheetRef.current.snapTo(0)}
                    />
                    <IconButton onPress={createFoodRequest}/>
                </View>
            </View>
        </View>
    );
}


export default FoodRequestScreen;