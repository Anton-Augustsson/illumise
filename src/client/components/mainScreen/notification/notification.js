import React from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import RequestIcon from "../../customComponents/requestIcon";
import CustomHeader from "../../customComponents/customHeader";
import ms from "../../mainStyles/ms";
import { Localization } from '../../../modules/localization';

const NOTIFICATIONS = [
    {
        "id":"1",
        "type":"food",
        "msg":"Ny order xd",
        "time":"13:00",
    },{
        "id":"2",
        "type":"mail",
        "msg":"Du är trash",
        "time":"10:20",
    },{
        "id":"3",
        "type":"msg",
        "msg":"En beställning från ieojfdfdfkefefkjjwoijefiewjfiweiojfijeieojfwoijewofijweiofejwjLilla Huset på 12 bitar sushi",
        "time":"00:00",
    }
]

const NotificationListItem = (item) => {
    return(
        <TouchableOpacity 
            style={ms.itemContainer}>
            <RequestIcon type={item.type} size={30} color="black"/>
            <Text numberOfLines={2} style={ms.msg}>{item.msg}</Text>
            <Text style={ns.time}>{item.time}</Text>
        </TouchableOpacity>
    );
}

const NotificationScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <CustomHeader 
                title={Localization.getText("notifications")}
                nav={navigation}
                goBack={false}
            />
            <FlatList
                data={NOTIFICATIONS}
                renderItem={({item})=>NotificationListItem(item)}
                keyExtractor={(item)=>item.id}
            />
        </View>
    );
}

const ns = StyleSheet.create({
    time:{
        position:"absolute",
        right:0,
        top:0,
        marginTop:5,
        marginRight:5,
        fontWeight:"bold",
        color:"grey",
    }
});

export default NotificationScreen;