// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from "../api" // Importa a instância do Axios configurada para a API

type Role = "ADMIN" | "HR" | "EMPLOYEE";

interface TokenPayload {
  sub: string;
  role: Role;
  exp: number;
  iss: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  user: { login: string; role: Role } | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ login: string; role: Role } | null>(null);
  const [loading, setLoading] = useState(true);

  // Ao abrir o app, verifica se já existe token salvo
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("@token");
      if (token) {
        try {
          const decoded = jwtDecode<TokenPayload>(token);

          // Verifica se o token não expirou
          const isExpired = decoded.exp * 1000 < Date.now();
          if (isExpired) {
            await AsyncStorage.removeItem("@token");
          } else {
            setUser({ login: decoded.sub, role: decoded.role });
            setIsAuthenticated(true);
          }
        } catch {
          await AsyncStorage.removeItem("@token");
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (loginInput: string, password: string) => {
    const response = await api.post("/auth/login", { login: loginInput, password });
    const { token } = response.data;

    await AsyncStorage.setItem("@token", token);

    const decoded = jwtDecode<TokenPayload>(token);
    setUser({ login: decoded.sub, role: decoded.role });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};