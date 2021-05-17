import React, {useState, useEffect, useRef} from 'react';
import { Text, View, FlatList, StyleSheet,
         TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {colors} from "../mainStyles/colors";
import { Localization } from '../../modules/localization';
import {magicValues} from "../mainStyles/magicValues";

const Chat = ({chatObject, user, other, isCreator, socket}) => 
{
    const [chat, setChat] = useState(null);
    const [msg, setMsg] = useState('');
    const [isFocused, setFocus] = useState(false);
    const myFullName = `${user.firstName} ${user.lastName}`;
    const otherFullName = `${other.firstName} ${other.lastName}`;

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

    const flatList = useRef(null);
    const showText = (index) => chat.length == index + 1 || chat[index].isProvider != chat[index + 1].isProvider;

    return (
        <>
            <View style = {cs.upperContainer}> 
                <FlatList
                    ref={flatList}
                    data={chat}
                    onContentSizeChange={() => {
                        flatList.current.scrollToEnd();
                    }}
                    renderItem={({item, index})=>
                        <Msg item={item.isProvider != isCreator
                            ? { me: true,  msg: item.msg, name: myFullName, time: item.time, showText: showText(index)}
                            : { me: false, msg: item.msg, name: otherFullName, time: item.time, showText: showText(index)} 
                        }/>}
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
                    multiline={true}
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
            style={[item.showText ? cs.msgOuterContainerText : 
                cs.msgOuterContainer, item.me
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
            {item.showText //TODO: Time?
                ? <Text style={cs.sender}>{`${item.name}`}</Text>
                : null
            }
        </View>
    );
}

const cs = StyleSheet.create({
    upperContainer: {
        flex:1,
        backgroundColor:"white",
    },
    msgOuterContainer: {
        paddingTop: 1,
        paddingBottom:1,
        paddingRight:10,
        paddingLeft:10,
    },
    msgOuterContainerText: {
        paddingTop: 1,
        paddingBottom:7,
        paddingRight:10,
        paddingLeft:10,
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
        alignItems: "flex-start",
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