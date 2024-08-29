import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config/apiconfig';

export default function Navbar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [count, setCount] = useState('0');

  const handleMenuPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCart = () => {
    navigation.navigate('CartScreen');
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDeliveryBoySignup = () => {
    navigation.navigate('DeliveryBoySignup');
  };

  const handleRetailerSignup = () => {
    navigation.navigate('RetailerSignup');
  };

  const getCount = async () => {
    const newCount = await AsyncStorage.getItem('count');
    if (newCount) {
      setCount(newCount)
    }
  };

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const {data} = await api.get('/product/cart');
        // console.log(data.,'ccccccccccc')
        setCartItems(data.length);
      } catch (error) {
        console.error('Error in fetching Cart :', error);
      }
    };
    fetchUserCart();
  }, [cartItems]);

  useEffect(() => {
    console.log('ASSSSSSS')
    getCount()
  }, [])


  return (
    <View style={styles.navbar}>
      <Text style={styles.logo} onPress={() => navigation.navigate('Signup')}>
        SBM
      </Text>
      <Text style={styles.logo}>Coins : {count}</Text>

      <View style={styles.navRight}>
        <TouchableOpacity onPress={handleCart}>
          <Text style={styles.menuButton}>🛒: {cartItems}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMenuPress}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for the menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Menu</Text>
            <Button
              style={styles.btn}
              title="Become a Delivery Boy"
              onPress={handleDeliveryBoySignup}
            />
            <Button
              style={styles.btn}
              title="Become a Retailer"
              onPress={handleRetailerSignup}
            />
            <Button style={styles.btn} title="Logout" onPress={handleLogOut} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navRight: {
    flexDirection: 'row',
    gap: 20,
  },
  btn: {
    marginBottom: 15,
  },
  navbar: {
    height: 60,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    color: '#fff',
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    gap: 10,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
