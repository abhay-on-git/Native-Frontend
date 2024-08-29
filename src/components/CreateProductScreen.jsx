import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { api } from '../config/apiconfig';
import { useNavigation } from '@react-navigation/native';

const CreateProductScreen = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const { navigate } = useNavigation();

  const handleSubmit = async () => {
    if (!title || !price) {
      Alert.alert('Error', 'Title and price are required.');
      return;
    }

    try {
      const response = await api.post('/product/createProduct', {
        title,
        price,
        imageURL,
      });
      Alert.alert('Success', 'Product created successfully!');
      setTitle('');
      setPrice('');
      setImageURL('');
      navigate('HomeScreen')
    } catch (error) {
      Alert.alert('Error', 'Failed to create product.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter product title"
        />
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter product price"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Image URL:</Text>
        <TextInput
          style={styles.input}
          value={imageURL}
          onChangeText={setImageURL}
          placeholder="Enter image URL (optional)"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateProductScreen;
