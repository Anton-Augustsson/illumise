import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet,
        TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from "../mainStyles/colors";
import { Localization } from '../../modules/localization';
import {magicValues} from "../mainStyles/magicValues";
import communication from '../../modules/client-communication/communication';
import io from "socket.io-client";

const url = communication.url;
let socket;

/*const EXAMPLE = [
    {
        "id":"1",
        "sender": "Banan",
        "senderId": "1002323123123123123",
        "time": null,
        "msg": "jweifojweo wieojfoiwe joweij oiwej oiwej woeij",
    },{
        "id":"2",
        "sender": "Morgan",
        "senderId": "1923i12093u91238081412904i8",
        "time": null,
        "msg": " iowejoiwe jfoiwej oeiwj ewioj weoiewj oiwejew"
    },{
        "id":"3",
        "sender": "Banan",
        "senderId": "1002323123123123123",
        "time": null,
        "msg": "weiojf iwefoooiwej owiejfiwejf iwejf jwijf"
    },{
        "id":"4",
        "sender": "Morgan",
        "senderId": "1923i12093u91238081412904i8",
        "time": null,
        "msg": " iweofjwoejf"
    },{
        "id":"5",
        "sender": "Morgan",
        "senderId": "1923i12093u91238081412904i8",
        "time": null,
        "msg": "i w"
    }
]*/

let id = 0;

const Chat = ({name, senderId, room}) => {
    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState('');
    //const [id, setId] = useState(0);
    const [isFocused, setFocus] = useState(false);
    const ENDPOINT = url;

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', {senderId, name, room});

        return () => {
            socket.disconnect();
        }  
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('msg', msg => {
            console.log(id);
            recivedMsg(msg.user, msg.name, msg.text);
        });
    }, []);

    const sendMsg = (event) => {
        // TODO: call client client communication
        event.preventDefault();
        //setMsg is callback for socket.emit below
        socket.emit('sendMsg', {senderId, name, room, msg}, () => setMsg(''));
    }    // TODO: call client client communication

    const insertMsg = (sender, name, msg) => {
        let toInsert = {
            "id":id.toString(),
            "sender": name.toString(),
            "senderId": sender.toString(),
            "time": Date.now(),
            "msg": msg.toString()
        };
        //var newId = id+1;
        //setId(newId);
        id+=1;
        console.log("60: " + id);
        setChat((previousChat) => {
            return ([...previousChat, toInsert]);
        });
    }

    const recivedMsg = (sender, name, msg) => {
        return insertMsg(sender, name, msg);
    }

    /** Keyboard constants ***/
    const [keyboard, setKeyboard] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const keyboardShow = (event) =>  {
        setKeyboard(true);
        setKeyboardHeight(event.endCoordinates.height - magicValues.MENU_HEIGHT);
    }
    const keyboardHide = () => {
        setKeyboard(false);
        setKeyboardHeight(0);
    }

    useEffect(() => {
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
                    renderItem={({item})=><Msg item = {item} senderId = {senderId}/>}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={
                        <View style={cs.emptyChatContainer}>
                            <Text style={[cs.emptyChatMsg, cs.emptyChatMsgAbove]}>
                                {Localization.getText("emptyChatConversationEmpty")}
                            </Text>
                            <Text style={[cs.emptyChatMsg, cs.emptyChatMsgBelow]}>
                                {Localization.getText("emptyChatMsg")}
                            </Text>
                        </View>
                    }
                />
            </View>
            <View style={[cs.bottomContainer, {marginBottom: keyboardHeight}]}>
                <TextInput
                    style={[cs.msgInput, {borderColor: !isFocused ? colors.INPUT_BORDER : colors.INPUT_FOCUS}]}
                    onFocus={()=>setFocus(true)}
                    onBlur={()=>setFocus(false)}
                    placeholder={Localization.getText("writeMsg")}
                    onChangeText={msg =>{ setMsg(msg);}}
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

const Msg = ({item, senderId}) => {
    return (
        <View 
            style={[cs.msgOuterContainer,
                item.senderId === senderId ? 
                cs.youOuterMsgContainer : cs.themOuterMsgContainer]}
        >

            <View 
                style={[cs.msgContainer,
                item.senderId === senderId ? 
                cs.youMsgContainer : cs.themMsgContainer]}
            >

                <Text style={cs.msg}>{item.msg}</Text>
            </View>
            <Text style={cs.sender}>{item.sender}</Text>
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
        maxHeight:100,
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