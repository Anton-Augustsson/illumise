// TODO

import React, {useState, useEffect} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import ms from "../mainStyles/ms";
import io from "socket.io-client";

let socket;
let ENDPOINT = "";

const ChatView = ({name, room}) => {
    const [chat, setChat] = useState([]);
    const [numMsg, setNumMsg] = useState(1);

    // TODO: listen for messages and then call recived msg
    useEffect(() => {
        // TODO: import ENDPOINT
        /*
        socket = io(ENDPOINT);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
            alert(error);
            }
        });*/
    }, [ENDPOINT]);

    useEffect(() => {
        // Listens for incoming messages
        /*
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });*/
    }, []);

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
          <MessageInput setChat={setChat} numMsg={numMsg} setNumMsg={setNumMsg}></MessageInput>
        </View>
    );
}

const ChatItem = ({item}) => {
    return (
            <Text numberOfLines={2} style={ms.msg}>{item.sender + ": " + item.msg}</Text>
    );
}

const MessageInput = ({setChat, numMsg, setNumMsg}) => {
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
                return sendMsg({setChat}, numMsg, {setNumMsg}, "Morgan", msg)
            }}> 
                <Text>Skicka</Text>
            </TouchableOpacity>
        </View>
    )
}

function insertMsg({setChat}, numMsg, {setNumMsg}, sender, msg){
    let toInsert = {
        "id":numMsg.toString(),
        "sender": sender.toString(),
        "time": Date.now(),
        "msg": msg.toString()
    };
    setNumMsg(numMsg+1);
    setChat((previousChat) => {
        return ([...previousChat, toInsert]);
    });
}

function sendMsg({setChat}, numMsg, {setNumMsg}, chatID, msg){
    // TODO: call client client communication
    return insertMsg({setChat}, numMsg, {setNumMsg}, "Morgan", msg)
}

function recivedMsg({setChat}, numMsg, {setNumMsg}, chatID, msg){
    return insertMsg({setChat}, numMsg, {setNumMsg}, "Sombody", msg)
}

const cs = StyleSheet.create({
    chatContainer: {
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 5,
    }, 
});

export default ChatView;
