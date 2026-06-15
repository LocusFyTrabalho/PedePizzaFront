import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { PrivateStackParamList } from "@/routes/types";
import { styles } from "./styles";

import { AuthContext } from "@/context/AuthContext"; 

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name']; 
  rota: keyof PrivateStackParamList;
}

const FooterComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  
  const { user, logout } = useContext(AuthContext);

  const menus: Record<string, MenuItem[]> = {
    EMPLOYEE: [
      { id: 1, label: "Home", icon: "home-outline", rota: "Home" },
      { id: 2, label: "Hours", icon: "time-outline", rota: "Horas" },
      { id: 3, label: "Profile", icon: "person-outline", rota: "Perfil" },
    ],
    HR: [
      { id: 4, label: "Users List", icon: "people-outline", rota: "ListaUsuario" },
      { id: 5, label: "Register", icon: "person-add-outline", rota: "RegistrarUsuario" },
    ],
    ADMIN: [
      { id: 6, label: "Dashboard", icon: "grid-outline", rota: "Dashboard" },
      { id: 7, label: "Tracking", icon: "eye-outline", rota: "ListaFuncionarios" },
      { id: 8, label: "Payments", icon: "cash-outline", rota: "PagamentoHoras" },
    ],
  };

  const botoesTipoPerfil = (user?.role && menus[user.role]) ? menus[user.role] : [];

  const handleLogout = () => {
    Alert.alert(
      "Exit",
      "Are you sure to want loggout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", style: "destructive", onPress: logout },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {botoesTipoPerfil.map((botao) => (
        <TouchableOpacity 
          key={botao.id} 
          style={styles.menuItem} 
          onPress={() => navigation.navigate(botao.rota)}
        >
          <Ionicons name={botao.icon} size={24} color="#ffffff" />
          <Text style={styles.menuLabel}>{botao.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        <Text style={styles.menuLabel}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterComponent;