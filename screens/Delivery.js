import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import firebase,{ auth, db } from '../config/firebase';

const Delivery = ({route}) => {
    const navigation = useNavigation();
    const {products, name, uid, phone, nameShipper, emailShipper, phoneShipper, km, orderId, idPerson} = route.params;
    let uidUser = "" + uid;
    const handleSubmit = async () => {
        await db.collection('Buyer-Personal-Info').doc(idPerson).update({
            status: true
        })
        await db.collection('Shipper').add({
            Email: emailShipper,
            FullName: nameShipper,
            PhoneNumber: phoneShipper,
            TransportFee: Math.round(km/1000) * 5000,
            orderId: orderId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            navigation.navigate("HomeScreen")
        })
    }
    console.log('Delivery person: ', idPerson)
    return (
        <>
        <View style={{flex: 1,backgroundColor: "white"}}>
            <ScrollView>
                <View style={{marginHorizontal: 10, marginVertical: 20, marginBottom: 70}}>
                    <View>
                        <Text style={{color: "gray", fontSize: 20}}>Giao hàng cho khách sau: </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{color: "gray", fontSize: 16}}>Khách hàng</Text>
                        <Text style={{fontWeight: "bold", fontSize: 18, marginTop: 5}}>{name}</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{color: "gray", fontSize: 16}}>Khách hàng thanh toán</Text>
                        <View style={{flexDirection: "row", marginTop: 5}}>
                            <Text style={{backgroundColor: "blue", color: "white", fontSize: 15, padding: 5}}>Thẻ/ Ví</Text>
                            <Text style={{backgroundColor: "orange", color: "black", fontSize: 15, padding: 5, marginLeft: 10}}>Khuyến mãi</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{color: "gray", fontSize: 16, marginBottom: 5}}>Đơn hàng của khách</Text>
                        {products && products.map((product) => (
                            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}
                                key={product.ID}
                            >
                                <Text style={{fontSize: 20, fontWeight: "bold"}}>{product.Title}</Text>
                                <Text style={{fontSize: 20, fontWeight: "bold"}}>x {product.qty}</Text>
                            </View>
                        ))}
                        
                    </View>
                    <View style={{marginTop: 30}}>
                        <Text style={{color: "gray", fontSize: 16}}>Ghi chú của khách hàng</Text>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginTop: 10}}>Không có bất kỳ ghi chú nào</Text>
                    </View>
                </View>
            </ScrollView>
        </View>     
        <View style={{
            position: "absolute", bottom: 10, left: 0, right: 0,
        }}>
            <TouchableOpacity style={{
                alignItems: "center", backgroundColor: "green",
                marginHorizontal: 10
                }}
                onPress={handleSubmit}
            >
                <Text style={{color: "white", padding: 10, fontSize: 20, fontWeight: "bold"}}>Đã giao hàng</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

export default Delivery

const styles = StyleSheet.create({})