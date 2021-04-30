// TODO

import React, {useState, useEffect} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import ms from "../mainStyles/ms";
import io from "socket.io-client";
import communication from '../../modules/client-communication/communication';
import FloatingInput from './Inputs/floatingInput';

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
            recivedMsg(msg.user, msg.text);
        });
    }, []);

    //function sendMsg({setChat}, numMsg, {setNumMsg}, chatID, sender, msg, {setMsg}) {
    const sendMsg = (event) => {
        // TODO: call client client communication
        event.preventDefault();
        //setMsg is callback for socket.emit below
        socket.emit('sendMsg', {name, room, msg}, () => setMsg(''));
        //return insertMsg({setChat}, numMsg, {setNumMsg}, "Morgan", msg);
    }    // TODO: call client client communication


    const insertMsg = (sender, msg) => {
        let toInsert = {
            "id":numMsg.toString(),
            "sender": sender.toString(),
            "time": Date.now(),
            "msg": msg.toString()
        };
        //setNumMsg(numMsg+1);sendMessage
        numMsg+=1;
        console.log("60: " + numMsg);
        //console.log("Message: " + msg);
        setChat((previousChat) => {
            //console.log(previousChat);
            return ([...previousChat, toInsert]);
        });
    }

    const recivedMsg = (sender, msg) => {
        return insertMsg(sender, msg);
    }

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

            <View>
                <FloatingInput
                style={{height: 40}}
                placeholder="Type message"
                onChangeText={msg => setMsg(msg)}
                defaultValue={msg}
                />
                <TouchableOpacity style = {ms.button} onPress={sendMsg}>
                    <Text>Skicka</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const ChatItem = ({item}) => {
    return (
            <Text numberOfLines={2} style={ms.msg}>{item.sender + ": " + item.msg}</Text>
    );
}

const cs = StyleSheet.create({
    chatContainer: {
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 5,
    }, 
});

export default ChatView;
