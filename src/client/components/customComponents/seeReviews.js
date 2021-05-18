import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import ms from "../mainStyles/ms";
import { Localization } from "../../modules/localization";
import Loading from "./loading";
import review from "../../modules/client-communication/review";
import account from "../../modules/client-communication/account";
import UserInfo from "./userInfo";
import UserProfile from "./userProfile";
import ReviewStars from "./reviewStars";

const ReviewItem = ({navigation, item, getProvider}) => 
{
    const [user, setUser] = useState({});
    const [rating, setRating] = useState({averageRating: 0, numRatings: 0});

    useEffect(() => 
    {
        const init = async () => 
        {
            let result = await account.getFromID(item.creatorID);
            if(result) setUser(result);
            result = await review.getRating(item.creatorID, true);
            if(result) setRating(result);
        }
        init();
    }, []);

    return (
        <View style={[styles.padding,styles.reviewContainer]}>
            <UserInfo
                user={{...user, getProvider: getProvider}}
                hasRating={false}
                navigation={navigation}
            />
            <View style={{marginTop:6}}></View>
            <ReviewStars
                stars={item.value}
                hasAverage={false}
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
        let result = await review.getAllToUser(user._id, true);
        if (result) setReviews(result);
        result = await review.getRating(user._id, true);
        if (result) setRating(result);
        setIsRefreshing(false);
    }

    useEffect(() => 
    {
        refresh().then(() => setLoading(false));
    }, [user]);

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
                    keyExtractor={(_, index)=>index.toString()}
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
