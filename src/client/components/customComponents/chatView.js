// TODO

<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import ms from "../mainStyles/ms";
import io from "socket.io-client";
import communication from '../../modules/client-communication/communication';

const url = communication.url;
let socket;

const ChatView = ({name, room}) => {
    const [chat, setChat] = useState([]);
    const [numMsg, setNumMsg] = useState(1);

    const ENDPOINT = url;
    useEffect(() => {

        socket = io(ENDPOINT);
        console.log(socket);

        let name = "userID";
        let room = "chatID";

        socket.emit('join', {name, room});

        return () => {
            socket.emit('disconnect');
        }
    });

    useEffect(() => {
        socket.on('msg', msg => {
            recivedMessage({setChat}, numMsg, {setNumMsg}, room, msg.text);
        });
    });

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
    socket.emit('sendMsg', {name, room, msg});
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
