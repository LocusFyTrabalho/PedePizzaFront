
import api from '../api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string; 
  role?: string;
  exp: number;
  [key: string]: any;
} 

export async function login(loginUsuario: string, password: string) {
  const response = await api.post('/auth/login', { login: loginUsuario, password });
  const { token } = response.data; 

  await AsyncStorage.setItem('@token', token);

  const decoded = jwtDecode<TokenPayload>(token);
  return token;
}

export async function logout() {
  await AsyncStorage.removeItem('@token');
}

export async function getStoredToken() {
  return AsyncStorage.getItem('@token');
}