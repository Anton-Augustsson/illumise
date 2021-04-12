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
        navigation: "FoodRequest",
    },
    {
        id: "2",
        title: "Second Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
    {
        id: "3",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
    {
        id: "4",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
    {
        id: "5",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
    {
        id: "6",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
    {
        id: "7",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
    {
        id: "8",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
        navigation: "home",
    },
];

const InnerItem = (props)  => {
    return(
        <TouchableOpacity onPress={()=> {
            props.nav.navigate(props.navigation);
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

const Item = ({item}) => (
    <View style={hs.itemContainer}> 
        <InnerItem
            source={item.img1}
            navigation={item.navigation1}
        />
        <InnerItem
            source={item.img2}
            navigation={item.navigation2}
        />
    </View>
);

const renderItem = ({item}) => { 
    return (
        <Item
            item={item}
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
    console.log(navigation);

    return (
        <View>
            <TopWelcome/>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={navigation}
            />
        </View>
    );
}

export default HomeScreen;
