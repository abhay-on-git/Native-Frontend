import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { api } from '../config/apiconfig';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const { data } = await api.get('/product/cart');
        setCartItems(data);
      } catch (error) {
        console.error('Error in fetching Cart Items:', error);
      }
    };
    fetchUserCart();
  }, []); 

  const renderItems = () => {
    return cartItems.map((item) => (
      <View key={item._id} style={styles.cartItem}>
        <Text style={styles.itemName}>{item?.title || "title"}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        renderItems() 
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    color: '#000',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007bff',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
