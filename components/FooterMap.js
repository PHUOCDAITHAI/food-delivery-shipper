import { StyleSheet, Text, View, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../config/firebase'
const FooterMap = ({products, name, uid, phone, km, orderId}) => {
    const navigation = useNavigation();
    const [nameShipper, setNameShipper] = useState('');
    const [emailShipper, setEmailShipper] = useState('');
    const [imgShipper, setImgShipper] = useState('');
    const [phoneShipper, setPhoneShipper] = useState('');
    const [idPerson, setIdPerson] = useState(null);
    const call = () => {
        let phoneNumber = '';
        if(Platform.OS === "android"){
            phoneNumber = `tel:${phone}`;
        }else {
            phoneNumber = `telprompt:${phone}`;
        }
        Linking.openURL(phoneNumber);
    }
    const uidShipper = auth.currentUser.uid;
    useEffect(() => {
        db.collection('users').doc(uidShipper).get().then((doc) => {
            setNameShipper(doc.data().FullName);
            setEmailShipper(doc.data().Email);
            setImgShipper(doc.data().Img);
            setPhoneShipper(doc.data().Phone);
        })
    }, [])
    
    const delivery = async () => {
        const buyerPerson = await db.collection('Buyer-Personal-Info').where('status','==',false).get();
        for(var snap of buyerPerson.docs){
           setIdPerson(snap.id);
        }    
        if(idPerson !== null){
            navigation.navigate("Delivery", {products, name, uid, phone, nameShipper, emailShipper, phoneShipper, km, orderId, idPerson})
        }    
    }
    return (
    <View style={styles.footer}>
        <View style={{flexDirection: "row"}}>
            <View style={styles.ViewCard}>
                <TouchableOpacity 
                    onPress={call}
                >
                        <Icon 
                            name='phone' type='material-community' 
                            iconStyle={{color: "white"}} size={30}
                        />
                        <Text style={{color: 'white', fontSize: 15}}>Gọi điện</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ViewCard}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ChatRoomScreen', {uid})}
                >
                    <Icon 
                        name='message-processing-outline' type='material-community' 
                        iconStyle={{color: "white"}} size={30}
                    />
                    <Text style={{color: 'white', fontSize: 15}}>Nhắn tin</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ViewCard}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OrderScreen', {products, name, uid, phone})}
                >
                    <Icon 
                        name='clipboard-text-outline' type='material-community' 
                        iconStyle={{color: "white"}} size={30}
                    />
                    <Text style={{color: 'white', fontSize: 15}}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ViewCard}>
                <TouchableOpacity 
                    onPress={delivery}
                >
                    <Icon 
                        name='moped' type='material-community' 
                        iconStyle={{color: "white"}} size={30}
                    />
                    <Text style={{color: 'white', fontSize: 14}}>Giao hàng</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        <View style={{flexDirection: "row", backgroundColor: "#102445", justifyContent: "space-between", padding: 10, alignItems: "center"}}>
            <View style={{width: "70%", height: 60 ,backgroundColor: "white", alignItems: "center", justifyContent:"center", borderRadius:  10}}>
                <Text style={{color: "blue", fontSize: 20, fontWeight: "bold"}}>Tôi đang ở nhà hàng</Text>
            </View>
            <TouchableOpacity style={{marginRight: 10}}
                onPress={() => navigation.navigate("Account", {nameShipper,emailShipper,imgShipper, phoneShipper, uidShipper})}
            >
                <Icon name='account' type='material-community' size={28} 
                    iconStyle={{color: "white"}}
                />
                <Text style={{color: "white"}}>Tài khoản</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default FooterMap

const styles = StyleSheet.create({
    footer: {
        // backgroundColor: "#102445"
    },
    ViewCard: {
        width: '25%', 
        backgroundColor: "#102445", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20
    }
})