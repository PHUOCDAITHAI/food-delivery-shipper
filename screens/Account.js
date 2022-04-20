import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Button } from 'react-native-elements';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
const Account = ({route}) => {
    const navigation = useNavigation();
    const {nameShipper, emailShipper, imgShipper, phoneShipper, uidShipper} = route.params;
    const [name, setName] = useState(nameShipper);
    const [cell, setCell] = useState(phoneShipper);
    const [email, setEmail] = useState(emailShipper);
    const handleUpdate = () => {
        db.collection('users').doc(uidShipper).update({
            Email: email,
            FullName: name,
            Phone: cell
        }).then(() => {
            navigation.navigate("HomeScreen");
        })
    }
    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.navigate("SignInScreen");
        })
    }
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            {/* <ScrollView> */}
                <View style={{marginTop: 10, alignItems: "center"}}>
                    <Image 
                        source={{uri: imgShipper}}
                        style={{width: 200, height: 200, borderRadius: 100}}
                    />
                </View>
                <View style={{marginLeft: 20}}>
                    <Text style={{fontSize: 16, color: "#5e6977"}}>Tên</Text>
                    <TextInput 
                        value={name}
                        onChangeText={text => setName(text)}
                        style={{borderBottomWidth: 1,borderBottomColor: "#bdc6cf",marginRight: 20, paddingTop: 5, paddingBottom: 5}}
                    />
                    <Text style={{fontSize: 16, color: "#5e6977", marginTop: 10}}>Số điện thoại</Text>
                    <TextInput 
                        value={cell}
                        onChangeText={text => setCell(text)}
                        style={{borderBottomWidth: 1,borderBottomColor: "#bdc6cf",marginRight: 20, paddingBottom: 5}}
                    />
                    <Text style={{fontSize: 16, color: "#5e6977", marginTop: 10}}>Địa chỉ email</Text>
                    <TextInput 
                        editable={false}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{borderBottomWidth: 1,borderBottomColor: "#bdc6cf",marginRight: 20, paddingBottom: 5}}
                    />
                    <View style={{marginRight: 20, marginTop: 25}}>
                        <Button 
                            onPress={handleUpdate}
                            title="Cập nhật"
                            buttonStyle={{backgroundColor: "#ff8c52"}}
                            titleStyle={{fontSize: 20}}
                        />
                    </View>
                </View>
                    
            {/* </ScrollView> */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{color: "#5e6977", fontWeight: "bold", fontSize: 20, marginTop: 20, textAlign: "center"}}>Đăng xuất</Text>
                </TouchableOpacity>
                <Text style={{color: "red", fontWeight: "bold", fontSize: 20, marginTop: 10, textAlign: "center"}}>Trung tâm trợ giúp</Text>
            </View>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    footer: {
        marginTop: 31,
        height: 100,
        backgroundColor: "#e1e8ee"
    }
})