import React from "react";
import {TouchableOpacity, Image, View, Text, StyleSheet} from "react-native";
import ReviewStars from "./reviewStars";

const UserProfile = ({user, rating}) => {
    return (
        <View 
            style={styles.userContainer}
        >
            {user.picture ?
                <Image
                    style={styles.profileImg}
                    source={{uri: user.picture}}
                />
                :null
            }
            <Text style={styles.name}>{user.firstName? `${user.firstName} ${user.lastName}` : ""}</Text>
            <ReviewStars size={20} stars={rating.averageRating}/>
        </View>
    )
}

export default UserProfile;

const styles = StyleSheet.create({
    userContainer: {
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    },
    name: {

    },
    profileImg: {
        width:100,
        height:100,
        borderRadius: 15
    },
});