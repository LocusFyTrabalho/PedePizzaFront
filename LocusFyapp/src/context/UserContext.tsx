import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipagem unificada para o Front, simulando a junção das duas entidades do seu Backend
export interface UnifiedUserEmployee {
  id: string;
  // Backend User
  login: string;
  role: "ROLE_EMPLOYEE" | "ROLE_HR" | "ROLE_MANAGER";
  password?: string;
  // Backend Employee
  name: string;
  email: string;
  salary: string;
}

interface UserContextData {
  users: UnifiedUserEmployee[];
  addUser: (user: Omit<UnifiedUserEmployee, "id">) => Promise<void>;
  updateUser: (id: string, updatedData: Partial<UnifiedUserEmployee>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

const ASYNC_STORAGE_KEY = "@LocusFy:users";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UnifiedUserEmployee[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedUsers) setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };
    loadUsers();
  }, []);

  const saveToStorage = async (updatedList: UnifiedUserEmployee[]) => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(updatedList));
      setUsers(updatedList);
    } catch (error) {
      console.error("Erro ao salvar dados", error);
    }
  };

  const addUser = async (newUser: Omit<UnifiedUserEmployee, "id">) => {
    const dataWithId: UnifiedUserEmployee = {
      ...newUser,
      id: Math.random().toString(36).substring(2, 9),
    };
    await saveToStorage([...users, dataWithId]);
  };

  const updateUser = async (id: string, updatedData: Partial<UnifiedUserEmployee>) => {
    const updatedList = users.map((u) => (u.id === id ? { ...u, ...updatedData } : u));
    await saveToStorage(updatedList);
  };

  const deleteUser = async (id: string) => {
    const updatedList = users.filter((u) => u.id !== id);
    await saveToStorage(updatedList);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};