// TODO

import React, {useState} from 'react';
import { Text, View, Image, FlatList, StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import CustomHeader from '../../../customComponents/customHeader';
import ms from "../../../mainStyles/ms";
import os from "./orderStyle";
import cs from "./chatStyle";
import { useEffect } from 'react';

let numMsg = 3;
const CHAT = [
    {
        "id":"1",
        "sender": "Alice",
        "msg": "Hello World!",
    },

    {
        "id":"2",
        "sender": "Bob",
        "msg": "Hello!!",
    }
]


const OrderScreen = ({navigation, route}) => {
    const [chat, setChat] = useState([]);
    //setChat(CHAT);
    
    return (
        <View style={{flex:1}}>
            <CustomHeader
              title={route.params.id}
                nav={navigation}
            ></CustomHeader>
            <View> 
                <Text>Request title</Text>
                <Text>Location: DummyLocation</Text>
                <Text>Person: DummyPerson</Text>
                <View style = {os.descriptionContainer}>
                    <Text style = {os.descriptionText}>Description of request</Text>
                </View>        
            </View>

            <View style = {os.chatContainer}> 
                <Text>Chat window</Text>
                <FlatList
                    data={chat}
                    renderItem={({item})=><ChatItem item = {item}/>}
                    keyExtractor={(item)=>item.id}
                />
            </View>
            <MessageInput setChat = {setChat}></MessageInput>
            
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
            
            // addMessage
            let toInsert = {
                "id":numMsg.toString(),
                "sender": "Morgan",
                "time": null,
                "msg": ""
            };
            toInsert.time = Date.now();
            toInsert.msg = msg;
            numMsg += 1;
            setChat((previousChat) => {
                return ([...previousChat, toInsert]);
            });
            }}> 
                <Text>Skicka</Text>
            </TouchableOpacity>
        </View>
    )
}

function insertMessage(sender, msg) {
    //TODO
    console.log("inside insertMessage!");
    let toInsert = {
        "id":"3",
        "sender": "Morgan",
        "msg": "TEST!",
    };
    //CHAT.push(toInsert);
    //Hur renderar jag ett text objekt per meddelande?
}

function echoMessage(msg) {
    var sender = "Bob";
    insertMessage(sender, msg);
}

function receiveMessage(msg) {
    var sender = "Alice";
    insertMessage(sender, msg);
}

export default OrderScreen;

