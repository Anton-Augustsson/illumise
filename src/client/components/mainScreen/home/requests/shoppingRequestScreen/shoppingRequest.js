import React, {useState, useRef} from 'react';
import { Text, View, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from "../../../../customComponents/customButton";
import CustomHeader from "../../../../customComponents/customHeader"
import ms from '../../../../mainStyles/ms';
import rs from "../requestStyle";
import BottomSheet from "reanimated-bottom-sheet";
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import {Localization} from "../../../../../modules/localization";
import { USUSAL_ARTICLES } from './usualArticles';
import { AntDesign } from '@expo/vector-icons';
import QuantityChooser from '../../../../customComponents/quantityChooser';
import CartButton from '../../../../customComponents/cartButton';
import RenderCart from "../../../../customComponents/renderCart";

//TODO vi måste ha någon sorts uuid generator

const UsualArticles = (props) => {
    const [expand, setExpand] = useState(true);

    return(
        <View style={rs.usualArticleContainer}>
            <View style={rs.usualArticleInnerContainer}>
                <View style={rs.usualArticleCategory}>
                    <Text style={ms.h4}>{props.category}</Text>
                </View>
                <View style={[rs.usualArticleItemContainer, 
                    expand ? {height:50} : {}
                ]}>
                {
                    props.data.map(articles => (
                        <TouchableOpacity  key={articles.id} style={rs.usualArticle}>
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


const ShoppingRequestScreen = ({navigation}) => {
    //TODO ID MÅSTE VARA EN STRÄNG
    const [id, setId] = useState("0");

    const createFoodRequest = (addr, list) =>{
        navigation.navigate("Deliver", {id: "0", type: 'food', delivAddress: addr, shoppingList: list});
    }

    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [otherInfo, setOtherInfo] = useState("");

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        })
    }

    const addItem = (name, quantity, otherInfo) => {
        if(name == "") {
            return;
        } else if(items.length >= 99) {
            return;
        }

        setItems(prevItems => {
            setId((id+1).toString());
            return [{id:id, name: name, quantity:quantity, otherInfo:otherInfo},...prevItems]
        })
        setName("");
        setQuantity(1);
        setOtherInfo("");
    }

    const renderHeader = () => (
        <View style={{overflow:"hidden", paddingTop:5}}>
            <View style={rs.bsHeaderContainer}>
                <View style={rs.bsDrawIndicator}></View>
            </View>
        </View>
    );

    const sheetRef = useRef(null);   
    const [overlay, setOverlay] = useState(false);
    const screenHeight = Dimensions.get('screen').height;

    const nextScreen = () => {
        navigation.navigate("Deliver", {
            type: "shopping",
            stops: [],
            shoppingList: items,
        });
    }
    return (
        <View style={{flex:1}}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={["65%", 0, 0]}
                initialSnap={1}
                renderContent={()=><RenderCart data={items} onPress={nextScreen}/>}
                renderHeader={renderHeader}
                enabledContentTapInteraction={false}
                onOpenStart={()=>setOverlay(true)}
                onCloseEnd={()=>setOverlay(false)}
            />
            <CustomHeader
                title="Handla"
                nav={navigation}
            />
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={[rs.overlayOuter,{zIndex:overlay ? 10 : -100}]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[rs.overlayInner, {display: overlay ? "flex" : "none"}]}
                        onPress={()=>{
                            setOverlay(false);
                            sheetRef.current.snapTo(1);
                        }}
                    />
                </View>
                <View style={rs.content}>
                    <View style={{height:screenHeight-200, paddingTop:"10%"}}>
                        <Text style={ms.h3}>
                            {Localization.getText("addOwnArticle")}
                        </Text>
                        <FloatingInput 
                            value={name}
                            onChangeText={text=>setName(text)} 
                            placeholder={Localization.getText("name")}/>
                        <FloatingInput 
                            value={otherInfo}
                            onChangeText={text=>setOtherInfo(text)} 
                            placeholder={Localization.getText("otherInfoShopping")}/>
                        <View style={{marginTop:10,marginBottom:3}}>
                            <QuantityChooser state={quantity} setState={setQuantity}
                            text={Localization.getText("quantity")}/>
                        </View>
                        <CustomButton
                            style={[ms.button,{marginTop:10}]}
                            title="Lägg till vara"
                            styleText={{fontWeight:"bold"}}
                            onPress={()=>addItem(name, quantity, otherInfo)}
                        />
                        
                        <View style={rs.scrollDown}>
                            <Text>{Localization.getText("scrollDown")}</Text>
                            <AntDesign name="caretdown" size={24} color="black" />
                        </View>
                    </View>
                    <Text style={ms.h3}>
                        {Localization.getText("proposalForArticles")}
                    </Text>
                    <UsualArticles category={Localization.getText("basicGoods")} data={USUSAL_ARTICLES.basicGoods}/>
                    <UsualArticles category={Localization.getText("fruits")} data={USUSAL_ARTICLES.fruits}/>
                </View>
                
            </ScrollView>
            <View style={rs.moveOnContainer}>
                <CartButton 
                    counter={items.length}
                    onPress={()=>{
                        sheetRef.current.snapTo(0);
                    }}
                />
            </View>
        </View>
    );
}


export default ShoppingRequestScreen;