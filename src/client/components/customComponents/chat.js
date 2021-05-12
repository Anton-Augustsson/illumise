import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet,
         TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from "../mainStyles/colors";
import { Localization } from '../../modules/localization';
import {magicValues} from "../mainStyles/magicValues";
import communication from '../../modules/client-communication/communication';
import io, { Socket } from "socket.io-client";

const url = communication.url;
/** @type {Socket} */
let socket;

const Chat = ({chatObject, user, other, isCreator}) => 
{
    const [chat, setChat] = useState(null);
    const [msg, setMsg] = useState('');
    const [isFocused, setFocus] = useState(false);
    const ENDPOINT = url;
    const myFullName = `${user.firstName} ${user.lastName}`;
    const otherFullName = `${other.firstName} ${other.lastName}`;

    useEffect(() => 
    {
        socket = io(ENDPOINT);
        socket.emit('join', {senderId: user._id, chatID: chatObject._id});

        return () => {
            socket.disconnect();
        }  
    }, [ENDPOINT]);

    useEffect(() => 
    {
        socket.on('msg', msg => 
        {
            insertMsg(msg.msg, msg.time, msg.isProvider);
        });

        // Insert existing messages
        let initialChat = [];
        initialChat = initialChat.concat(chatObject.provider.messages.map((message) => 
        {
            return {
                "msg": message.text,
                "time": message.time,
                "isProvider": true
            }
        }));
        initialChat = initialChat.concat(chatObject.requester.messages.map((message) => 
        {
            return {
                "msg": message.text,
                "time": message.time,
                "isProvider": false
            }
        }));
        initialChat.sort((a, b) => a.time - b.time);
        setChat(initialChat);

    }, []);

    const sendMsg = (event) => 
    {
        event.preventDefault();
        socket.emit('sendMsg', { 
            chatID: chatObject._id, 
            msg: msg, 
            time: Date.now(), 
            isProvider: !isCreator 
        }, () => setMsg(''));
    }

    const insertMsg = (msg, time, isProvider) => 
    {
        let toInsert = 
        {
            "msg": msg,
            "time": time,
            "isProvider": isProvider
        };

        setChat((previousChat) => 
        {
            return ([...previousChat, toInsert].sort((a, b) => a.time - b.time));
        });
    }

    /** Keyboard constants ***/
    const [keyboard, setKeyboard] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const keyboardShow = (event) =>  
    {
        setKeyboard(true);
        setKeyboardHeight(event.endCoordinates.height - magicValues.MENU_HEIGHT);
    }
    const keyboardHide = () => 
    {
        setKeyboard(false);
        setKeyboardHeight(0);
    }

    useEffect(() => 
    {
        Keyboard.addListener("keyboardDidShow", keyboardShow);
        Keyboard.addListener("keyboardDidHide", keyboardHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardShow);
            Keyboard.removeListener("keyboardDidHide", keyboardHide);
        };
    }, []);
    
    return (
        <>
            <View style = {cs.upperContainer}> 
                <FlatList
                    data={chat}
                    renderItem={({item})=>
                        <Msg item={item.isProvider != isCreator
                            ? { me: true,  msg: item.msg, name: myFullName} 
                            : { me: false, msg: item.msg, name: otherFullName}} 
                        />}
                    keyExtractor={(_, index)=> index.toString()}
                    ListEmptyComponent={()=>
                        {return chat ? 
                            <View style={cs.emptyChatContainer}>
                                <Text style={[cs.emptyChatMsg, cs.emptyChatMsgAbove]}>
                                    {Localization.getText("emptyChatConversationEmpty")}
                                </Text>
                                <Text style={[cs.emptyChatMsg, cs.emptyChatMsgBelow]}>
                                    {Localization.getText("emptyChatMsg")}
                                </Text>
                            </View>
                            :
                            null
                        }
                    }
                />
            </View>
            <View style={[cs.bottomContainer, {marginBottom: keyboardHeight}]}>
                <TextInput
                    style={[cs.msgInput, {borderColor: !isFocused ? colors.INPUT_BORDER : colors.INPUT_FOCUS}]}
                    onFocus={()=>setFocus(true)}
                    onBlur={()=>setFocus(false)}
                    placeholder={Localization.getText("writeMsg")}
                    onChangeText={msg => {setMsg(msg);}}
                    defaultValue={msg}
                    multiline
                />
                <TouchableOpacity 
                    style = {cs.sendContainer} 
                    onPress={sendMsg}
                > 
                    <Text style={cs.sendMsg}>{Localization.getText("send")}</Text>
                    <MaterialCommunityIcons style={cs.sendIcon} name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const Msg = ({item}) => {
    return (
        <View 
            style={[cs.msgOuterContainer, item.me
            ? cs.youOuterMsgContainer 
            : cs.themOuterMsgContainer]}
        >

            <View 
                style={[cs.msgContainer, item.me
                ? cs.youMsgContainer 
                : cs.themMsgContainer]}
            >

                <Text style={cs.msg}>{item.msg}</Text>
            </View>
            <Text style={cs.sender}>{item.name}</Text>
        </View>
    );
}

const cs = StyleSheet.create({
    upperContainer: {
        flex:1,
        backgroundColor:"white",
    },
    msgOuterContainer: {
        paddingTop: 7,
        paddingBottom:7,
        paddingRight:14,
        paddingLeft:14,
    },
    msgContainer: {
        maxWidth:"80%",
        padding:10,
        borderRadius:10,
    },
    youOuterMsgContainer: {
        alignItems:"flex-end",
    },
    themOuterMsgContainer: {

    },
    youMsgContainer: {
        backgroundColor:colors.YOU_MSG_COLOR,
    },
    themMsgContainer: {
        backgroundColor:colors.THEM_MSG_COLOR,
    },
    msg: {

    },
    bottomContainer: {
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:colors.SAMARIT_GREEN,
        paddingLeft:5,
        paddingBottom:2.5,
        paddingTop:2.5,
    },
    msgInput: {
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5,
        paddingBottom:5,
        borderWidth:2,
        borderStyle:"solid",
        borderRadius:20,
        backgroundColor:"white",
        maxHeight:80,
    },
    sendContainer: {
        flexDirection:"row",
        alignItems:"center",
        padding:5,
        borderRadius:5,
    },
    sendMsg: {
        marginRight:2,
        color:"white",
    },
    sendIcon: {
        color:"white",
    },
    emptyChatContainer: {
        justifyContent:"center",
        padding:30,
    },
    emptyChatMsg: {
        textAlign:"center",
    },
    emptyChatMsgAbove: {
        fontWeight:"bold",
        fontSize:16,
    },
    emptyChatMsgBelow: {
    }
});

export default Chat;