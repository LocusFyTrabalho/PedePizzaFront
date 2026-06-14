import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
  
  const { user } = useContext(AuthContext);

  const menus: Record<string, MenuItem[]> = {
    ROLE_EMPLOYEE: [
      { id: 1, label: "Home", icon: "home-outline", rota: "Home" },
      { id: 2, label: "Hours", icon: "time-outline", rota: "Horas" },
      { id: 3, label: "Profile", icon: "person-outline", rota: "Perfil" },
    ],
    ROLE_HR: [
      { id: 4, label: "Users List", icon: "people-outline", rota: "ListaUsuario" },
      { id: 5, label: "Register", icon: "person-add-outline", rota: "RegistrarUsuario" },
    ],
    ROLE_MANAGER: [
      { id: 6, label: "Dashboard", icon: "grid-outline", rota: "Dashboard" },
      { id: 7, label: "Tracking", icon: "eye-outline", rota: "ListaFuncionarios" },
      { id: 8, label: "Payments", icon: "cash-outline", rota: "PagamentoHoras" },
    ],
  };

  // CORREÇÃO AQUI: Adicionado o "|| []" no final. 
  // Se a role não existir dentro do objeto 'menus', ele assume um array vazio em vez de dar erro no map.
  const botoesTipoPerfil = (user?.role && menus[user.role]) ? menus[user.role] : [];

  return (
    <View style={styles.container}>
      {botoesTipoPerfil.map((botao) => (
        <TouchableOpacity 
          key={botao.id} 
          style={styles.menuItem} 
          onPress={() => navigation.navigate(botao.rota)}
        >
          {/* O "as any" foi removido pois a tipagem na interface agora está correta */}
          <Ionicons name={botao.icon} size={24} color="#ffffff" />
          <Text style={styles.menuLabel}>{botao.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterComponent;