import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button } from 'react-native-elements';
import Logo from '../images/delivery.png'
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            navigation.navigate("HomeScreen")
            setEmail('')
            setPassword('')
        }).catch(err => alert(err.message));
    }
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <View style={{
                marginTop: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 20
            }}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Đăng nhập</Text>
                </View>
                <Image  
                    source={Logo}
                    style={{
                        height: 100, width: 100
                    }}
                />
            </View>
            <View style={{alignItems: "center", marginTop: 5}}>
                <Text style={styles.text1}>Vui lòng nhập email và mật khẩu</Text>
                <Text style={styles.text1}>Đăng nhập với tài khoản của bạn</Text>
            </View>
            <TextInput 
                placeholder='Email'
                style={styles.textInput}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput 
                placeholder='Mật khẩu'
                style={styles.textInput2}
                value={password}
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />
            <Button 
                title='Đăng nhập' 
                buttonStyle={{
                    marginHorizontal: 20,
                    backgroundColor: "#ff8c52"
                }}
                titleStyle={{fontSize: 20}}
                onPress={handleSubmit}
            />
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    text1: {
        color:  "#86939e",
        fontSize: 16
    },
    textInput: {
        marginHorizontal: 20, 
        borderWidth: 1, 
        borderColor: "gray",
        marginVertical: 20,
        padding: 10,
        borderRadius: 10,
        fontSize: 18
    },
    textInput2: {
        marginHorizontal: 20, 
        borderWidth: 1, 
        borderColor: "gray",
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        fontSize: 18
    }
})