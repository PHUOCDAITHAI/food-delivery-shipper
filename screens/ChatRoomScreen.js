import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase,{ auth, db } from '../config/firebase';
import {Icon} from 'react-native-elements';
const ChatRoomScreen = ({route}) => {
    const {uid} = route.params;
    const [messages, setMessages] = useState([]);
    const [img, setImg] = useState('');
    const uidShipper = auth.currentUser.uid;
    useEffect(() => {
        const docid = uid > uidShipper ? uidShipper + "-" + uid : uid + "-" + uidShipper;
        const messageRef = db.collection('chatrooms').doc(docid).collection('messages').orderBy('createdAt', 'desc')
        messageRef.onSnapshot(snapshot => {
            const allmsg = snapshot.docs.map(doc => {
                const data = doc.data();
                if(data.createdAt){
                    return {
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate()
                    }
                }else {
                    return {
                        ...doc.data(),
                        createdAt: new Date()
                    }
                }
            })
            setMessages(allmsg)
        })
    }, [])

    const onSend = (messageArray) => {
        const msg = messageArray[0];
        const mymsg = {
            ...msg,
            sentBy: uidShipper,
            sentTo: uid,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = uid > uidShipper ? uidShipper + "-" + uid : uid + "-" + uidShipper;
        db.collection('chatrooms').doc(docid).collection('messages').add({
            ...mymsg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }  

    function getImg() {
        const [img, setImg] = useState(null);
        db.collection('users').doc(uidShipper).get().then(doc => {
            setImg(doc.data().Img)
        })
        return img;
    }

    useEffect(() => {
        db.collection('users').doc(uidShipper).get().then(doc => {
            setImg(doc.data().Img);
        })
    },[])

    console.log(img)

    return (
        <GiftedChat
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: uidShipper,
                avatar: img
            }}
            
            renderBubble={(props) => {
                return <Bubble 
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: "blue"
                        },
                        
                    }}
                />
            }}

            renderInputToolbar={(props) => {
                return <InputToolbar 
                    {...props}
                    containerStyle={{borderTopWidth: 1.5, borderTopColor: "black"}}
                    textInputStyle = {{color: "black"}}
                />
            }}
        />
    )
}

export default ChatRoomScreen

const styles = StyleSheet.create({})