import React, {useState, useRef} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import QuantityChooser from '../../../../customComponents/quantityChooser';
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import {Localization} from '../../../../../modules/localization'
import { ScrollView } from 'react-native-gesture-handler';
import MyBottomSheet from '../../../../customComponents/myBottomSheet';
import Cart from "../../../../customComponents/cart";
import CartButton from "../../../../customComponents/cartButton";


const FoodRequestScreen = ({navigation}) => {
    const [dish, setDish] = useState("");
    const [amount, setAmount] = useState(1);
    const [otherInfo, setOtherInfo] = useState("");
    const [location, setLocation] = useState("");
    const [items, setItems] = useState([]);

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
        })
    }

    const addItem = (dish, amount, other) => {
        if(dish === ""){
            return
        }

        setItems(prevItems => {
            setId((id+1).toString());
            return [{id:id, name: dish, quantity: amount, otherInfo: other},...prevItems]
        })
        setDish("");
        setAmount(1);
        setOtherInfo("");
        inputText.current.initState();
        inputOtherInfo.current.initState();
        cartButton.current.animation(); 
    }

    const nextScreen = () => {
        navigation.navigate("Deliver", {
            type: "food",
            stops: [location],
            shoppingList: items,
        });
    }

    const [id, setId] = useState("0");
    const sheetRef = useRef();
    const inputText = useRef();
    const inputOtherInfo = useRef();
    const cartButton = useRef();

    return (
        <View style={{flex:1}}>
            <CustomHeader
                    title={Localization.getText("food")}
                    nav={navigation}
            />
            <View style={{flex:1}}>
                <MyBottomSheet
                    ref={sheetRef}
                    snapPoints={["65%", 0, 0]}
                    renderContent={
                        <Cart data={items} 
                            data={items} 
                            setData={setItems} 
                            deleteItem={deleteItem} 
                            onPress={nextScreen}
                        />
                    }
                />

                <View style={rs.content}>
                    <Text style={ms.h3}>{Localization.getText("enterRestaurant")}</Text>
                    <GooglePlaces
                        placeholder={Localization.getText("restaurant")}
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            setLocation({adress: data.description, location: details.geometry.location});
                        }}
                    />
                    <ScrollView contentContainerStyle={{flexGrow:1}}>
                        <Text style={ms.h3}>Lägg till en maträtt</Text>
                        <FloatingInput 
                            ref={inputText}
                            onChangeText={(text)=>setDish(text)} 
                            placeholder={Localization.getText("dish")} value={dish}/>
                        
                        <FloatingInput 
                            ref={inputOtherInfo}
                            onChangeText={text=>setOtherInfo(text)} 
                            placeholder={Localization.getText("otherInfo")}
                            value={otherInfo}/>
                        <View style={{marginTop:10}}>
                            <QuantityChooser state={amount} setState={setAmount} text={Localization.getText("amount")}/>
                        </View>
                        <CustomButton
                            style={[ms.button,{marginTop:10}]}
                            title={Localization.getText("addToShoppingCart")}
                            styleText={{fontWeight:"bold"}}
                            onPress={() => addItem(dish, amount, otherInfo)}
                        />
                    </ScrollView>
                </View>
                <View style={ms.moveOnContainer}>
                    <CartButton 
                        ref={cartButton}
                        counter={items.length}
                        onPress={()=>sheetRef.current.snapTo(0)}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
      width: "100%",
      height: "70%",
      marginBottom: 20,
    },
  });

export default FoodRequestScreen;