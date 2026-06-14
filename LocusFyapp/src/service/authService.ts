// services/authService.ts
import api from '../api'; // Importa a instância do Axios configurada para a API
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string; // geralmente o "login" do usuário
  role?: string;
  exp: number;
  [key: string]: any;
} 

export async function login(loginUsuario: string, password: string) {
  const response = await api.post('/auth/login', { login: loginUsuario, password });
  const { token } = response.data; // LoginResponseDTO -> { token: string }

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