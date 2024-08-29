import React, { useState } from 'react';
import { api } from '../config/apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Remove this if not used
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';

export default function Signup({ navigation , route}) {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [referral, setReferral] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !mobile || !name || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    const userdata = {
      email,
      mobile,
      name,
      referral,
      password,
    };

    try {
      const response = await api.post('/auth/userSignup', userdata);
      navigation.navigate('Signin')
      // Alert.alert('Success', 'Signup successful!');
    } catch (error) {
      console.log("Error in Signup", error.message);
      Alert.alert('Error', 'Signup failed, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        placeholderTextColor="#888"
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Referral (Optional)"
        value={referral}
        placeholderTextColor="#888"
        onChangeText={setReferral}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        placeholderTextColor="#888"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.div}>
        <Text style={styles.text}>If you already have an account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.link}>Signin</Text>
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
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#000',
  },
  signupButton: {
    backgroundColor: '#903fdc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})