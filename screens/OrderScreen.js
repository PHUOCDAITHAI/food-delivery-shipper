import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import Logo from '../images/delivery.png'
import { useNavigation } from '@react-navigation/native'
const OrderScreen = ({route}) => {
    const navigation = useNavigation();
    const {products, name, uid, phone} = route.params;
    const price = products.map((cartProduct) => {
        return cartProduct.TotalProductPrice;
      })
    const reducerOfPrice = (accumulator, currentValue) => accumulator+currentValue;
    const totalPrice = price.reduce(reducerOfPrice, 0)
    const call = () => {
        let phoneNumber = '';
        if(Platform.OS === "android"){
            phoneNumber = `tel:${phone}`;
        }else {
            phoneNumber = `telprompt:${phone}`;
        }
        Linking.openURL(phoneNumber);
    }
    return (
        <>
        <ScrollView style={{marginBottom: 70}}>
            <View style={{marginLeft: 30, marginRight: 10, marginTop: 10}}>
                <View>
                    <Text style={{color: "#808080", fontSize: 18}}>Khách hàng</Text>
                    <Text style={{marginTop: 5, fontSize: 20}}>{name}</Text>
                </View>
                <View style={{marginTop: 13}}>
                    <Text style={{color: "#808080", fontSize: 18}}>Đơn hàng của khách</Text>
                    {products && products.map((product) => (
                        <View key={product.ID}>
                            <Text style={{marginTop: 5, fontSize: 20, fontWeight: "bold"}}>{product.Title}</Text>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold"}}>x {product.qty}</Text>
                                <Text style={{fontSize: 20, color: "gray"}}>{product.TotalProductPrice}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={{borderWidth: 0.6, marginVertical: 20, borderColor: "#bdc6cf"}}></View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 20}}>Tổng tạm tính</Text>
                    <Text style={{fontSize: 20, color: "gray"}}>{totalPrice}₫</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                    <Text style={{fontSize: 20}}>Khuyến mãi</Text>
                    <Text style={{fontSize: 20, color: "gray"}}>-10000</Text>
                </View>
                <View style={{borderWidth: 0.6, marginVertical: 20, borderColor: "#bdc6cf"}}></View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Tổng cộng</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "green"}}>{totalPrice - 10000}₫</Text>
                </View>
                <View style={{borderWidth: 0.6, marginVertical: 20, borderColor: "#bdc6cf"}}></View>
                <Text style={{fontSize: 17, color: "gray"}}>Ghi chú của khách hàng</Text>
                <Text style={{fontSize: 20, marginTop: 10}}>Không có bất kỳ ghi chú nào</Text>
            </View>
        </ScrollView>
        <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
            }}>
                <TouchableOpacity 
                    onPress={call}
                    style={{width: "50%",
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        padding: 15,
                        borderColor: "gray"
                    }}
                >
                    <Icon 
                        name='phone' type='material-community' 
                        iconStyle={{color: "#272727"}} size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("ChatRoomScreen", {uid})}
                    style={{width: "50%",
                        borderTopWidth: 1,
                        padding: 15,
                        borderColor: "gray"
                    }}
                >
                    <Icon 
                        name='message-processing-outline' type='material-community' 
                        iconStyle={{color: "#272727"}} size={30}
                        
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})