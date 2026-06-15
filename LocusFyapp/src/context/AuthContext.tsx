
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from "../api" 

type Role = "ADMIN" | "HR" | "EMPLOYEE";

interface TokenPayload {
  sub: string;
  role: Role;
  employeeId: number | null; 
  exp: number;
  iss: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  user: { login: string; role: Role; employeeId: number | null } | null; 
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ login: string; role: Role; employeeId: number | null } | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("@token");
      if (token) {
        try {
          const decoded = jwtDecode<TokenPayload>(token);


          const isExpired = decoded.exp * 1000 < Date.now();
          if (isExpired) {
            await AsyncStorage.removeItem("@token");
          } else {
            setUser({ login: decoded.sub, role: decoded.role, employeeId: decoded.employeeId });
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
    setUser({ login: decoded.sub, role: decoded.role, employeeId: decoded.employeeId });
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