import React from 'react';
import { 
    Text, 
    View, 
    Image, 
    FlatList, 
    useState,
    TouchableOpacity
} from 'react-native';
import ms from "../../mainStyles/ms"
import hs from "./homeStyle"

const DATA = [
    {
        id: "1",
        title: "First Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "2",
        title: "Second Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "3",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "4",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "5",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "6",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "7",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
    {
        id: "8",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        des1: "FoodRequest",
        des2: "FoodRequest",
    },
];

const InnerItem = (props)  => {
    return(
        <TouchableOpacity onPress={()=> {
            props.nav.navigate(props.des);
        }} 
        style={hs.innerItemContainer}
        >
            <Image
                resizeMode={'cover'}
                style={hs.iconSize}
                source={props.source}
            />
        </TouchableOpacity>
    );
}

const Item = ({item, nav}) => (
    <View style={hs.itemContainer}> 
        <InnerItem
            source={item.img1}
            des={item.des1}
            nav={nav}
        />
        <InnerItem
            source={item.img2}
            des={item.des2}
            nav={nav}
        />
    </View>
);

const renderItem = ({item}, navigation) => { 
    return (
        <Item
            item={item}
            nav={navigation}
        />
    );
};

const TopWelcome = () => {
    return (
        <View style={hs.welcomeContainer}>
            <Text style={ms.h2}>God dag</Text>
        </View>
    );
}

const HomeScreen = ({navigation}) => {

    return (
        <View>
            <TopWelcome/>
            <FlatList
                data={DATA}
                renderItem={(item) => renderItem(item, navigation)}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default HomeScreen;
