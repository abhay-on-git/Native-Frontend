import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, SafeAreaView, Share, Image } from 'react-native';
import Navbar from '../components/Navbar';
import { api } from '../config/apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [role, setRole] = useState('');
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  const handleAddToCart = async (item) => {
    const productId = item._id;
    try {
      await api.post(`/product/add-to-cart/${productId}`);
      Alert.alert('Cart', `Added ${item.title} to cart!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Cart', `Error in adding item to cart!`);
    }
  };

  const handleCreateProduct = () => {
    navigation.navigate('CreateProductScreen');
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'This is the product 1',
      });
      setCount((prev) => prev + 1);
      console.log(count, "count")
      await AsyncStorage.setItem('count', count.toString());
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await api.get('/auth/userRole');
        console.log(userRole.data, 'User Role');
        setRole(userRole.data.role);
      } catch (error) {
        console.error('Error in fetching user role:', error);
      }
    };

    fetchUserRole();

    const getAllProducts = async ()=>{
       try {
        const response = await api.get('/product')
        // console.log(response.data)
        setProducts(response.data)
       } catch (error) {
        console.error('Error in fetching Products :', error);
       }
    }
    getAllProducts()
    
  }, []);

  useEffect(() => {
    const updateCoins = async()=>{
      await AsyncStorage.setItem('count', count.toString());
    }
    updateCoins()
  }, [count]);

  const handleRoleBasedAction = () => {
    switch (role) {
      case 'retailer':
        handleCreateProduct();
        break;
      case 'deliveryBoy':
        Alert.alert('Delivery Boy', 'Delivery Boy content here!');
        break;
      case 'user':
      default:
        Alert.alert('User', 'User content here!');
        break;
    }
  };

  const renderProductItem = (item) => (
    <View style={styles.productItem} key={item.title}>
      <Text style={styles.imagePlaceholderText}>{item.imageURL}</Text>
      {/* console.log(item.imageURL) */}
      {item.imageURL ? (
        <Image source={{ uri: item.imageURL }} style={styles.productImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.productText}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <Text style={styles.buttonText}>Share Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar navigation={navigation} />
      <ScrollView style={styles.container}>
        {products.map((item)=>renderProductItem(item))}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handleRoleBasedAction}>
        <Text style={styles.floatingButtonText}>{role}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding:20,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePlaceholderText: {
    color: '#777',
    fontSize: 16,
  },
  productText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
