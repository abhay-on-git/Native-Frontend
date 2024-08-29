import React from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/AuthStack/Signup';
import Signin from './src/AuthStack/Signin';
import HomeScreen from './src/AppStack/HomeScreen';
import RetailerSignup from './src/AuthStack/RetailerSignup';
import DeliveryBoySignup from './src/AuthStack/DeliveryBoySignup';
import CreateProductScreen from './src/components/CreateProductScreen';
import CartScreen from './src/components/CartScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="RetailerSignup" component={RetailerSignup} />
        <Stack.Screen name="DeliveryBoySignup" component={DeliveryBoySignup} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="CreateProductScreen" component={CreateProductScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  whiteText:{
    color:"#ffffff"
  },
  darkText:{
    color:"#000000"
  }
});

export default App;
