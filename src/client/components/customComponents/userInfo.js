import React from "react";
import {TouchableOpacity, Image, View, Text, StyleSheet} from "react-native";
import ReviewStars from "./reviewStars";

const UserInfo = ({user, rating, navigation}) => {
    return (
        <TouchableOpacity 
            onPress={()=>{
                navigation.navigate("SeeReviews", user);
            }}
            style={styles.userContainer}
        >
            {user.picture ?
                <Image
                    style={styles.profileImg}
                    source={{uri: user.picture}}
                />
                :null
            }
            <View style={styles.nameRatingContainer}>
                <Text>{user.firstName? `${user.firstName} ${user.lastName}` : ""}</Text>
                <ReviewStars stars={rating.averageRating}/>
            </View>
        </TouchableOpacity>
    )
}

export default UserInfo;

const styles = StyleSheet.create({
    userContainer: {
        flexDirection:"row",
    },
    nameRatingContainer: {
        justifyContent:"space-between",
    },
    profileImg: {
        width:35,
        height:35,
        marginRight: 7,
        borderRadius:5
    },
});