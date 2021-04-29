import React, {useState} from 'react';
import { Text, View, FlatList, StyleSheet,
        TouchableOpacity, TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from "../mainStyles/colors";
import { Localization } from '../../modules/localization';

const EXAMPLE = [
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
    },
]

const Chat = (props) => {
    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState('');
    const [id, setId] = useState("0");
    const [isFocused, setFocus] = useState(false);
    //setChat(CHAT);
    
    return (
        <>
            <View style = {cs.upperContainer}> 
                <FlatList
                    data={EXAMPLE}
                    renderItem={({item})=><Msg item = {item}/>}
                    keyExtractor={(item)=>item.id}
                />
            </View>
            <View style={cs.bottomContainer}>
                <TextInput
                    style={[cs.msgInput, {borderColor: !isFocused ? colors.INPUT_BORDER : colors.INPUT_FOCUS,}]}
                    onFocus={()=>setFocus(true)}
                    onBlur={()=>setFocus(false)}
                    placeholder={Localization.getText("writeMsg")}
                    onChangeText={msg => setMsg(msg)}
                    defaultValue={msg}
                />
                <TouchableOpacity 
                    style = {cs.sendContainer} 
                    onPress={() => {
                        // addMessage
                        setId((parseInt(id)+1).toString());
                        let toInsert = {
                            "id":id,
                            "sender": "Morgan",
                            "time": null,
                            "msg": ""
                        };
                        toInsert.time = Date.now();
                        toInsert.msg = msg;

                        setChat((previousChat) => {
                            return ([...previousChat, toInsert]);
                        });
                    }}
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
            style={[cs.msgOuterContainer,
                item.senderId === "1923i12093u91238081412904i8" ? 
                cs.youOuterMsgContainer : cs.otherOuterMsgContainer]}
        >

            <View 
                style={[cs.msgContainer,
                item.senderId === "1923i12093u91238081412904i8" ? 
                cs.youMsgContainer : cs.otherMsgContainer]}
            >

                <Text style={cs.msg}>{item.msg}</Text>
            </View>
            <Text style={cs.sender}>{item.sender}</Text>
        </View>
    );
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
        width:"80%",
        padding:10,
        borderRadius:10,
    },
    youOuterMsgContainer: {
        alignItems:"flex-end",
    },
    otherOuterMsgContainer: {

    },
    youMsgContainer: {
        backgroundColor:"lightblue",
    },
    otherMsgContainer: {
        backgroundColor:"lightgrey",
    },
    msg: {

    },
    bottomContainer: {
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:colors.SAMARIT_GREEN,
        paddingLeft:5,
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
    }
});

export default Chat;