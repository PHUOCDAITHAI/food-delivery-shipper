import { StyleSheet, Text, View, Image, SafeAreaView, Button, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { db } from '../config/firebase'
import Logo from '../images/delivery.png'
import {Icon} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const HomeScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(true);
  const [status, setStatus] = useState(false);
  const [latLocation, setLatLocation] = useState(null);
  const [lngLocation, setLngLocation] = useState(null);
  const [descLocation, setDescLocation] = useState(null);
  const [latDestination, setLatDestination] = useState(null);
  const [lngDestination, setLngDestination] = useState(null);
  const [descDestination, setDescDestination] = useState(null);
  const [name, setName] = useState(null);
  const [uid, setUid] = useState('');
  const [phone, setPhone] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);
  // const [shipper, setShipper] = useState([]);

  useEffect(() => {
    db.collection('Buyer-Personal-Info').where('status','==',false).onSnapshot(snapshot => {
        setUid(snapshot.docs.map(doc => doc.data().uid))
        setLatDestination(Number("" + snapshot.docs.map(doc => doc.data().lat)))
        setLngDestination(Number("" + snapshot.docs.map(doc => doc.data().lng)))
        setDescDestination("" + snapshot.docs.map(doc => doc.data().address))
        setName("" + snapshot.docs.map(doc => doc.data().FullName))
        setPhone(snapshot.docs.map(doc => doc.data().PhoneNumber))
        setOrderId(Number("" + snapshot.docs.map(doc => doc.data().orderId)))
    })
  }, [])

  // console.log(typeof(latDestination), lngDestination, descDestination)
  
  useEffect(() => {
    db.collection('Buyer-Cart ' + uid).onSnapshot(snapshot => {
        setProducts(snapshot.docs.map(doc => doc.data()));
    })
  },[uid])

  
  
  useEffect(() => {
    if(status && products.length != 0){
      Alert.alert(
        "Thông báo",
        "Có một đơn hàng từ khách hàng",
        [
          { text: "OK", onPress: () => {
            setStatus(false)
            navigation.navigate('MapScreen', {latLocation, lngLocation, descLocation, latDestination, lngDestination, descDestination, name, products, uid, phone, orderId})
          } }
        ]
      );
    }
  })

  const handleClick = () => {
    setStatus(!status)
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <View style={{marginTop: 40}}>
        <Text style={{fontSize: 30, padding: 20}}>GoodFood</Text>
      </View>
      <GooglePlacesAutocomplete 
        placeholder='Nhập vị trí hiện tại của bạn'
        styles={{
          container: {
            flex: 0,
            marginLeft: 10
          },
          textInput: {
            fontSize: 18
          }
        }}
        onPress={(data, details) => {
          setLatLocation(details.geometry.location.lat)
          setLngLocation(details.geometry.location.lng)
          setDescLocation(data.description)
          setSelected(false)
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: 'AIzaSyC57Oje5UCWuyjn_alA6iYcNDTft-6IpFs',
          language: 'en'
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
      />
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
              {selected || status===false ? (
                <Icon 
                  name='arrowright' color="white" type="antdesign"
                  iconStyle={{
                    backgroundColor: selected ? "gray" : "black",
                    borderRadius: 50,
                    padding: 5,
                    marginTop: 5
                  }}
                />
              ): (
                <Icon 
                  name='arrowright' color="white" type="antdesign"
                  iconStyle={{
                    backgroundColor: status ? "green" : "black",
                    borderRadius: 50,
                    padding: 5,
                    marginTop: 5
                  }}
                />
              )}
              
          </TouchableOpacity>
        </View>
      </View>

      {status && (
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={{fontWeight: "bold", fontSize: 22}}>Đang tiến hành tìm kiếm đơn hàng xin vui lòng chờ !....</Text>
        </View>
      )}      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})