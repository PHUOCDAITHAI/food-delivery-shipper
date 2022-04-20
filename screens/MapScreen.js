import { StyleSheet, Text, View} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import HeaderMap from '../components/HeaderMap';
import FooterMap from '../components/FooterMap';
const MapScreen = ({route}) => {
    const mapRef = useRef(null);
    const {latLocation, lngLocation, descLocation, 
        latDestination, lngDestination, descDestination, name, products, uid, phone, orderId} = route.params;
    const [km, setKm] = useState(null);
    const [time, setTime] = useState(null);
    useEffect(() => {
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: {
            top: 120, right: 100, bottom: 100, left: 100
          }
        })
    },[])
    useEffect(() => {
        const getTravelTime = async () => {
            fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${descLocation}&destinations=${descDestination}&key=AIzaSyC57Oje5UCWuyjn_alA6iYcNDTft-6IpFs`
            ).then((res) => res.json())
            .then(data => {
                setKm(data.rows[0].elements[0].distance.value)
                setTime(data.rows[0].elements[0].duration.text)
            })
        }
        getTravelTime()
    })
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1/4}}>
                <HeaderMap km={km} name={name} />
            </View>
            {latLocation && lngLocation && descLocation && latDestination && lngDestination && descDestination ? (
                <MapView
                ref={mapRef}
                style={{flex: 1/2}}
                mapType="mutedStandard"
                initialRegion={{
                    latitude: latLocation,
                    longitude: lngLocation,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker 
                    coordinate = {{
                        latitude: latLocation,
                        longitude: lngLocation
                    }}
                    title="Vị trí của bạn"
                    description={descLocation}
                    identifier="origin"
                />
                <MapViewDirections 
                    origin = {descLocation}
                    destination = {descDestination}
                    apikey='AIzaSyC57Oje5UCWuyjn_alA6iYcNDTft-6IpFs'
                    strokeWidth={3}
                    strokeColor="blue"
                />
                <Marker 
                    coordinate = {{
                        latitude: latDestination,
                        longitude: lngDestination
                    }}
                    title="Vị trí của khách hàng"
                    description={descDestination}
                    identifier="destination"
                />
            </MapView>
            ): (
                <View style={{flex: 1/2}}>
                    <Text>Xin vui lòng chờ ...</Text>
                </View>
            )}
            <View style={{flex: 1/4}}>
                <FooterMap products={products} name={name} uid={uid} phone={phone} km={km} orderId={orderId}/>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})