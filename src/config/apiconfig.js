import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://native-api-bci3.onrender.com';

let api;

const initializeApi = async () => {
  const token = await AsyncStorage.getItem('jwt');
  api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};

initializeApi();

export { api };
