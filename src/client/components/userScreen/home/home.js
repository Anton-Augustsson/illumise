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
    },
    {
        id: "2",
        title: "Second Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
    {
        id: "3",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
    {
        id: "4",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
    {
        id: "5",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
    {
        id: "6",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
    {
        id: "7",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
    {
        id: "8",
        title: "Third Item",
        img1:require("../../../assets/samarit_logo2.png"),
        img2:require("../../../assets/samarit_logo2.png"),
    },
];

const InnerItem = (props)  => {
    return(
        <TouchableOpacity onPress={props.onPress} style={hs.innerItemContainer}>
            <Image
                resizeMode={'cover'}
                style={hs.iconSize}
                source={props.source}
            />
        </TouchableOpacity>
    );
}

const Item = ({ item, onPress}) => (
    <View style={hs.itemContainer}> 
        <InnerItem
            source={item.img1}
            onPress={onPress}
        />
        <InnerItem
            source={item.img2}
            onPress={onPress}
        />
    </View>
);

const renderItem = ({ item }) => { 
    const backgroundColor = item.id //=== selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
        <Item
            item={item}
            //onPress={() => setSelectedId(item.id)}
            //backgroundColor={{ backgroundColor }}
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

const HomeScreen = () => {

    //const [selectedId, setSelectedId] = useState(null);

    return (
        <View>
            <TopWelcome/>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                //extraData={selectedId}
            />
        </View>
    );
}

export default HomeScreen;
