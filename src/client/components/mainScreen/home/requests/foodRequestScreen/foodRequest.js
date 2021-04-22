import React, {useState, useRef} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import CustomHeader from '../../../../customComponents/customHeader';
import CustomButton from '../../../../customComponents/customButton';
import GooglePlaces from '../../../../customComponents/Inputs/googlePlaces';
import FloatingInput from '../../../../customComponents/Inputs/floatingInput';
import QuantityChooser from '../../../../customComponents/quantityChooser';
import CartItem from "../../../../customComponents/cartItem"
import ms from "../../../../mainStyles/ms";
import rs from "../requestStyle";
import BottomSheet from "reanimated-bottom-sheet";
import {Localization} from '../../../../../modules/localization'
import IconButton from '../../../../customComponents/iconButton';
import { ScrollView } from 'react-native-gesture-handler';


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
        var result = amount + " " + dish + " " + other;
        setItems(prevItems => {
            setId((id+1).toString());
            return [{id:id, amount: amount, dish: dish, other: other},...prevItems]
        })
        setDish("");
        setAmount(1);
        setOtherInfo("");
    }

    const nextScreen = () => {
        navigation.navigate("Deliver", {
            type: "food",
            stops: [location],
            shoppingList: items,
        });
    }

    const [id, setId] = useState("0");
    const [overlay, setOverlay] = useState(false);
    const sheetRef = useRef(null);   

    return (
        <View style={{flex:1}}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={["65%", 0, 0]}
                initialSnap={1}
                enabledContentTapInteraction={false}
                onOpenStart={()=>setOverlay(true)}
                onCloseEnd={()=>setOverlay(false)}
            />
            <CustomHeader
                    title={Localization.getText("food")}
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
                    <Text style={ms.h3}>{Localization.getText("enterRestaurant")}</Text>
                    <GooglePlaces
                        placeholder={Localization.getText("restaurant")}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            setLocation(data.description);
                        }}
                    />
                    <Text style={ms.h3}>Lägg till en maträtt</Text>
                    <FloatingInput onChangeText={(text)=>setDish(text)} 
                        placeholder={Localization.getText("dish")} value={dish}/>
                    
                    <FloatingInput onChangeText={text=>setOtherInfo(text)} 
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

                    <FlatList
                        data={items}
                        renderItem={({item}) => <CartItem id={item.id} quantity={item.amount} name={item.dish} otherInfo={item.otherInfo} deleteItem={deleteItem}/>}
                        ListEmptyComponent={()=> <Text style={[ms.h3, {alignSelf:"center"}]}>{Localization.getText("emptyShoppingCartPrompt")}</Text>}
                        keyExtractor={(item) => item.id}
                    /> 
                </View>
            </ScrollView>

            <View style={rs.moveOnContainer}>
                <IconButton onPress={nextScreen}/>
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