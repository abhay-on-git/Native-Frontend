import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this import
import { api } from '../config/apiconfig'; // Ensure api is configured correctly
import axios from 'axios';

export default function Signin({ navigation }) {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [userType, setUserType] = useState('user');

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const userData = {
      email,
      password,
      checkBoxValue: userType,
    };

    try {
      console.log(userData, "userData")
      const response = await axios.post('https://native-api-bci3.onrender.com/auth/signin', userData);
      console.log(response.data.message, "response")
      // const jwt = response.data.jwt;
      await AsyncStorage.setItem('jwt', response.data.jwt);
      console.log(userData)
      Alert.alert('success', response.data.message);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log("Error in Signin", JSON.stringify(error)); // Log the full error
      Alert.alert('Error', error.message);
    }
  };

  const renderRadioButton = (type, value) => (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => setUserType(value)}
    >
      <View style={styles.radioButton}>
        {userType === value && <View style={styles.radioButtonSelected} />}
      </View>
      <Text style={styles.radioLabel}>{type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signin</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Select User Type:</Text>
      {renderRadioButton('User', 'user')}
      {renderRadioButton('Delivery Boy', 'deliveryBoy')}
      {renderRadioButton('Retailer', 'retailer')}

      <Button title="Sign In" onPress={handleSignin} />
      <View style={styles.div}>
        <Text style={styles.text}>If you don't have an account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    marginTop: 10,
    fontSize: 13,
  },
  link: {
    color: '#903fdc',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  div: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: "#000"
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    color: "#000",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000"
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
    color: "#000"
  },
});
