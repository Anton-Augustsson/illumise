import React from "react";
import {TouchableOpacity, Image, View, Text, StyleSheet} from "react-native";
import ReviewStars from "./reviewStars";

const UserInfo = ({user, rating, navigation, hasRating=true}) => {
    return (
        <TouchableOpacity 
            onPress={()=>{
                navigation.push("SeeReviews", user);
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
            <View style={{justifyContent:hasRating ? "space-between" : "center"}}>
                <Text>{user.firstName? `${user.firstName} ${user.lastName}` : ""}</Text>
                {hasRating ?
                    <ReviewStars stars={rating.averageRating}/>
                : null}
            </View>
        </TouchableOpacity>
    )
}

export default UserInfo;

const styles = StyleSheet.create({
    userContainer: {
        flexDirection:"row",
    },
    profileImg: {
        width:35,
        height:35,
        marginRight: 7,
        borderRadius:5
    },
});