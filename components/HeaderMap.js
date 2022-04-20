import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Icon} from 'react-native-elements'
import {db} from '../config/firebase'
const HeaderMap = ({km, name}) => {
  return (
        <>
            <View style={styles.header}>
                <View style={{padding: 10}}>
                    <View>
                        <Text style={{
                            color: "#006633", fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            1. Lấy từ
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            color: "white", fontSize: 17,
                            fontWeight: "bold"
                        }}>
                            Ấp rẫy mới, Thạnh trị, Sóc Trăng
                        </Text>
                    </View>
                </View>
                <View style={{backgroundColor: "black", padding: 10}}>
                    <View>
                        <Text style={{
                            color: "#993333", fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            2. Giao tới
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            color: "gray", fontSize: 16
                        }}>
                            {name}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: "#102445", padding: 10}}>
                <View style={{padding: 5, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{
                        color: "white", fontSize: 18,
                        fontWeight: 'bold'
                    }}>
                        Ấp rẫy mới, Thạnh trị, Sóc Trăng
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row", justifyContent: "space-evenly"
                }}>
                    <Text style={{color: '#EEE', fontSize: 16}}>GoodFood</Text>
                    <View style={{flexDirection: "row"}}>
                        <Icon 
                            name='check-decagram'
                            type='material-community'
                            iconStyle={{color: "#33CC66"}}
                        />
                        <Text style={{color: '#33CC66', fontSize: 16, marginLeft: 3}}>Ưa thích</Text>
                    </View>
                    <Text style={{color: '#EEE', fontSize: 16}}>{Math.round(km/1000) * 5000}₫</Text>
                    <View style={{
                        backgroundColor: "#3399FF", padding: 2, marginBottom: 5, marginTop: -2
                    }}>
                        <Text style={{color: 'white', fontSize: 16}}>Thẻ/Ví</Text>
                    </View>
                </View>
            </View>
        </>
        
  )
}

export default HeaderMap

const styles = StyleSheet.create({
    header:{
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: 5,
        backgroundColor: "#102445",
        borderBottomWidth: 1,
        borderColor: "gray"
    }
})