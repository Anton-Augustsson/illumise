import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import ms from "../mainStyles/ms";
import { Localization } from "../../modules/localization";
import Loading from "./loading";
import review from "../../modules/client-communication/review";
import account from "../../modules/client-communication/account";
import UserInfo from "./userInfo";
import UserProfile from "./userProfile";

const ReviewItem = ({navigation, item, getProvider}) => 
{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [rating, setRating] = useState({averageRating: 0, numRatings: 0});

    useEffect(() => 
    {
        const init = async () => 
        {
            setUser(await account.getFromID(item.creatorID));
            setRating(await review.getRating(item.creatorID, getProvider));

        }
        init().then(() => setLoading(false));
    }, []);

    return (
        <View style={[styles.padding,styles.reviewContainer]}>
            <UserInfo
                user={{...user, getProvider: getProvider}}
                rating={rating}
                navigation={navigation}
            />

            <Text style={styles.textContent}>
                {item.message}
            </Text>
        </View>
    );
}

const SeeReviews = ({navigation, route}) => 
{
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState({averageRating: 0, numRatings: 0});
    
    const user = route.params;

    const refresh = async () => 
    {
        setIsRefreshing(true);
        let result = await review.getAllToUser(user._id, user.getProvider);
        if (result) setReviews(result);
        setRating(await review.getRating(user._id, user.getProvider));
        setIsRefreshing(false);
    }

    useEffect(() => 
    {
        refresh().then(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            {loading ? <Loading/> :
                <FlatList
                    data={reviews}
                    renderItem={({item})=>
                        <ReviewItem 
                            navigation={navigation} 
                            item={item} 
                            getProvider={!user.getProvider}
                        />
                    }
                    keyExtractor={(item)=>item._id}
                    onRefresh={refresh}
                    refreshing={isRefreshing}
                    ListHeaderComponent={()=>
                        <View style={styles.padding}>
                            <UserProfile
                                user={user}
                                rating={rating}
                            />
                            <Text style={styles.allReviews}>{`${Localization.getText("allReviews")} -  ${rating.numRatings} st`}</Text>
                        </View>
                    }
                    ListEmptyComponent={()=>
                        <View style={[styles.padding,ms.emptyContainer]}>
                            <Text style={[ms.emptyMsg, ms.emptyMsgAbove]}>
                                {Localization.getText("noReviewsAvailable")}
                            </Text>
                        </View>
                    }
                />
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
    padding: {
        paddingLeft:20,
        paddingRight:20,
    },
    container: {
        flex:1,
        paddingTop:10,
        paddingBottom:10,
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
