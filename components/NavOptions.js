import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import Logo from '../images/delivery.png'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const NavOptions = ({latLocation, lngLocation, descLocation, selected, users}) => {
  const navigation = useNavigation();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState(null);
  const [priceKm, setPriceKm] = useState(null);
  const handleClick = () => {
    users.map((user) => {
      setLat(user.lat)
      setLng(user.lng)
      setAddress(user.address)
    })
    navigation.navigate("MapScreen", {latLocation, lngLocation, descLocation, lat, lng, address, priceKm, setPriceKm})
  }

  console.log(lat, lng, address)
  
  return (
    <View>
      <View style={{backgroundColor: "#eee", marginHorizontal: 20, padding: 10}}>
        <TouchableOpacity
          disabled={selected}
          onPress={handleClick}
        >
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Image 
                  style={{width: 200, height: 200}}
                  source={Logo}
              />
            </View>
            <View style={{alignItems: "center"}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Bắt đầu nhận đơn hàng mới</Text>
            </View>
            <Icon 
              name='arrowright' color="white" type="antdesign"
              iconStyle={{
                backgroundColor: selected ? "gray" : "black",
                borderRadius: 50,
                padding: 5,
                marginTop: 5
              }}
            />
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default NavOptions

const styles = StyleSheet.create({})