import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import CustomHeader from "./customHeader";
import ms from "../mainStyles/ms";
import { Localization } from "../../modules/localization";
import ReviewStars from "./reviewStars";
import account from "../../modules/client-communication/account";
import Loading from "./loading";

let data = [
    {
        "userIDFrom":"609913bedaf97859abdd9296",
        "requestID": "60981cd550ce9183cd0b5d01",
        "message":"Fusce ac eros efficitur ex facilisis ullamcorper. Vivamus metus tellus, cursus et arcu eget, interdum pulvinar velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis ut risus augue. Morbi interdum est congue, ultricies ex in, ornare risus. Ut malesuada massa eget ex accumsan fringilla. In quis efficitur nisl, ut varius turpis",
        "value":"5",
    },{
        "userIDFrom":"609911d6daf97859abdb62d3",
        "requestID": "60981cd550ce9183cd0b5d01",
        "message":"Nej",
        "value":"2",
    }
]

const ReviewItem = ({item, navigation}) => {
    console.log(item);
    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.name}>NAMN</Text>
            <ReviewStars stars={item.value}/>
            <Text style={styles.textContent}>
                {item.message}
            </Text>
        </View>
    );
}

const SeeReviews = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [reviews, setReviews] = useState(null);
    

    const fetch = async () => {
        setIsRefreshing(true);
        data.forEach(async (item, index) => {
            const user = await account.getFromID(item.userIDFrom);
            data[index].name = user.firstName + " " + user.lastName;
        });
        setIsRefreshing(false);
        setLoading(false);
    }

    useEffect(() => 
    {
        const init = async () => 
        {
            
        }

        init();
        fetch();
    }, []);

    return (
        <View style={{flex:1}}>
            {loading ? <Loading/> :
            <>
                <CustomHeader
                    title={Localization.getText("reviews")}
                    nav={navigation}
                />
                <View style={styles.container}>
                    <TouchableOpacity 
                        onPress={()=> {
                            fetch();
                        }}
                        style={styles.header}
                    >
                        <Text style={styles.headerName}>Bengt Åslund</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={data}
                        renderItem={({item})=><ReviewItem navigation={navigation} item={item}/>}
                        keyExtractor={(item)=>item._id}
                        onRefresh={fetch}
                        refreshing={isRefreshing}
                        ListHeaderComponent={()=>
                            <Text style={styles.allReviews}>{Localization.getText("allReviews")}</Text>
                        }
                        ListEmptyComponent={()=>
                            <View style={ms.emptyContainer}>
                                <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                                    {Localization.getText("noReviewsAvailable")}
                                </Text>
                            </View>
                        }
                    />
                </View>
            </>
            }
        </View>
    );
}

export default SeeReviews;

const styles = StyleSheet.create({
    header: {
    },
    headerName: {
        fontSize:35,
        fontWeight:"bold",
    },
    container: {
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
    },
    reviewContainer: {
        paddingBottom:10,
        paddingTop:10,
    },
    textContent: {
        marginTop:4,
    },
    name: {
        fontWeight:"bold",
        marginBottom:4,
    },
    allReviews: {
        fontSize:20,
        fontWeight:"bold",
    }
});
