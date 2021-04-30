// TODO

import React, {useState, useEffect} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import ms from "../mainStyles/ms";
import io from "socket.io-client";
import communication from '../../modules/client-communication/communication';

const url = communication.url;
let socket;
let numMsg = 1;
let setNumMsg;

const ChatView = ({name, room}) => {
    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState('');
    //const [numMsg, setNumMsg] = useState(1);

    const ENDPOINT = url;
    useEffect(() => {

        socket = io(ENDPOINT);

        socket.emit('join', {name, room});

        return () => {
            socket.disconnect();
        }

        
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('msg', msg => {
            console.log(numMsg);
            //console.log(msg);
            recivedMsg({setChat}, numMsg, {setNumMsg}, msg.user, msg.text);
        });
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
          <MessageInput setChat={setChat} numMsg={numMsg} setNumMsg={setNumMsg} room={room} sender={name} msg={msg} setMsg={setMsg} ></MessageInput>
        </View>
    );
}

const ChatItem = ({item}) => {
    return (
            <Text numberOfLines={2} style={ms.msg}>{item.sender + ": " + item.msg}</Text>
    );
}

const MessageInput = ({setChat, numMsg, setNumMsg, room, sender, msg, setMsg}) => {
    
    return (
        <View>
            <TextInput
            style={{height: 40}}
            placeholder="Type message"
            onChangeText={msg => setMsg(msg)}
            defaultValue={msg}
            />
            <TouchableOpacity style = {ms.button} onPress={() => {
                return sendMsg({setChat}, numMsg, {setNumMsg}, room.toString(), sender, msg, {setMsg});
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
    //setNumMsg(numMsg+1);sendMessage
    numMsg+=1;
    console.log("89: " + numMsg);
    //console.log("Message: " + msg);
    setChat((previousChat) => {
        //console.log(previousChat);
        return ([...previousChat, toInsert]);
    });
}

function sendMsg({setChat}, numMsg, {setNumMsg}, chatID, sender, msg, {setMsg}) {
//const sendMsg = (event, {setChat}, numMsg, {setNumMsg}, chatID, sender, msg, {setMsg}) => {
    // TODO: call client client communication
    //event.preventDefault();
    let name = sender;
    let room = chatID;
    socket.emit('sendMsg', {name, room, msg}, () => setMsg(''));
    //return insertMsg({setChat}, numMsg, {setNumMsg}, "Morgan", msg);
}

function recivedMsg({setChat}, numMsg, {setNumMsg}, sender, msg){
    return insertMsg({setChat}, numMsg, {setNumMsg}, sender, msg);
}

const cs = StyleSheet.create({
    chatContainer: {
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 5,
    }, 
});

export default ChatView;
