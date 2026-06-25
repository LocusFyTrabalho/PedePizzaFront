import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";
import { styles } from "./styles";

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  rota: string;
}

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

const FooterComponent = ({ navigation, state }: any) => {
  const { user, logout } = useContext(AuthContext);

  const botoesTipoPerfil = (user?.role && menus[user.role]) ? menus[user.role] : [];

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: logout },
      ]
    );
  };

  // Nome da aba atualmente ativa
  const activeRouteName = state?.routes[state?.index]?.name;

  return (
    <View style={styles.container}>
      {botoesTipoPerfil.map((botao) => {
        const isActive = activeRouteName === botao.rota;
        return (
          <TouchableOpacity
            key={botao.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate(botao.rota)}
          >
            <Ionicons
              name={botao.icon}
              size={24}
              color={isActive ? "#60A5FA" : "#ffffff"} // azul se ativo, branco se inativo
            />
            <Text style={[styles.menuLabel, isActive && { color: "#60A5FA" }]}>
              {botao.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        <Text style={styles.menuLabel}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterComponent;