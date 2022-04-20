import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import SignInScreen from './screens/SignInScreen';
import OrderScreen from './screens/OrderScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import Delivery from './screens/Delivery';
import Account from './screens/Account';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='SignInScreen'
          component={SignInScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='MapScreen'
          component={MapScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='OrderScreen'
          component={OrderScreen}
          options={{
            title: "Đơn đặt hàng"
          }}
        />
        <Stack.Screen 
          name='ChatRoomScreen'
          component={ChatRoomScreen}
          options={{
            title: "Tin nhắn"
          }}
        />
        <Stack.Screen 
          name='Delivery'
          component={Delivery}
          options={{
            title: "Giao hàng"
          }}
        />
        <Stack.Screen 
          name='Account'
          component={Account}
          options={{
            title: "Tài khoản"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
