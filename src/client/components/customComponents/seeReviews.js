import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import CustomHeader from "./customHeader";
import ms from "../mainStyles/ms";
import { Localization } from "../../modules/localization";
import ReviewStars from "./reviewStars";
import account from "../../modules/client-communication/account";
import Loading from "./loading";
import review from "../../modules/client-communication/review";

const ReviewItem = ({item}) => 
{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(true);

    useEffect(() => 
    {
        const init = async () => 
        {
            console.warn(item);
        }
        init().then(() => setLoading(false));
    }, []);

    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.name}>{``}</Text>
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
    const [reviews, setReviews] = useState([]);
    
    const user = route.params;

    const refresh = async () => 
    {
        setIsRefreshing(true);
        let result = await review.getAllToUser(user._id, user.getProvider);
        if (result !== null) setReviews(result);
        setIsRefreshing(false);
    }

    useEffect(() => 
    {
        refresh().then(() => setLoading(false));
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
                            refresh();
                        }}
                        style={styles.header}
                    >
                        <Text style={styles.headerName}>{`${user.firstName} ${user.lastName}`}</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={reviews}
                        renderItem={({item})=><ReviewItem navigation={navigation} item={item}/>}
                        keyExtractor={(item)=>item._id}
                        onRefresh={refresh}
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
