// TODO

import React, {useState} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import ms from "../mainStyles/ms";

let numMsg = 1;

const ChatView = () => {
    const [chat, setChat] = useState([]);
    //const [numMsg, setNumMsg] = useState(1);
    return (
        <View>
            <View style = {cs.chatContainer}> 
                <Text>Chat window</Text>
                <FlatList
                    data={chat}
                    renderItem={({item})=><ChatItem item = {item}/>}
                    keyExtractor={(item)=>item.id}
                />
            </View>
            <MessageInput setChat={setChat}></MessageInput>
        </View>
    );
}

const ChatItem = ({item}) => {
    return (
            <Text numberOfLines={2} style={ms.msg}>{item.sender + ": " + item.msg}</Text>
    );
}

const MessageInput = ({setChat}) => {
    const [msg, setMsg] = useState('');
    return (
        <View>
            <TextInput
            style={{height: 40}}
            placeholder="Type message"
            onChangeText={msg => setMsg(msg)}
            defaultValue={msg}
            />
            <TouchableOpacity style = {ms.button} onPress={() => {
                return insertMsg({setChat}, "Morgan", msg)
            }}> 
                <Text>Skicka</Text>
            </TouchableOpacity>
        </View>
    )
}

function insertMsg({setChat}, sender, msg){
    let toInsert = {
        "id":numMsg.toString(),
        "sender": "Morgan",
        "time": Date.now(),
        "msg": msg
    };
    numMsg += 1;
    setChat((previousChat) => {
        return ([...previousChat, toInsert]);
    });
}

function sendMsg(chatID, msg){

}



const cs = StyleSheet.create({
    chatContainer: {
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 5,
    }, 
});

export default ChatView;
