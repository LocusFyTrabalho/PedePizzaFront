
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const api = axios.create({
//   baseURL: 'http://172.20.10.6:8080',
//   headers: { 'Content-Type': 'application/json' },
// });

const api = axios.create({
  baseURL: 'http://192.168.0.4:8080',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token');
  if (token) {

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;