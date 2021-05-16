import React from "react";
import {TouchableHighlight, Image, Text, View, StyleSheet} from "react-native";
import ReviewStars from "./reviewStars";

const UserProfile = ({user, isUser = false,rating, onPress, disabled = false}) => {
    return (
        <TouchableHighlight
            style={styles.userContainer}
            onPress={onPress}
            disabled={disabled}
            underlayColor="#e8e8e8"
        >
            <>
            {user.picture ?
                <Image
                    style={styles.profileImg}
                    source={{uri: user.picture}}
                />
                :null
            }
            <Text style={styles.name}>{user.firstName? `${user.firstName} ${user.lastName}` : ""}</Text>
            <ReviewStars size={20} stars={rating.averageRating}/>
            {isUser && <Text style={styles.email}>{user.email}</Text>}
            {isUser && <Text>{new Date(user.dateCreated).toDateString()}</Text>}
            </>
        </TouchableHighlight>
    )
}

export default UserProfile;


const styles = StyleSheet.create({
    userContainer: {
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        padding:10,
        borderRadius:20,
    },
    name: {
        marginTop:5,
        marginBottom:4,
        fontSize:20,
    },
    profileImg: {
        height:150,
        width: 150,
        borderRadius: 20
    },
    email: {
        marginTop:3,
    }
});