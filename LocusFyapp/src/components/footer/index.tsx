import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { PrivateStackParamList } from "@/routes/types";
import { styles } from "./styles";

interface FooterProps {
  tipoPerfil: "funcionario" | "rh" | "gestor";
}

interface MenuItem {
  id: number;
  label: string;
  icon: keyof typeof Ionicons.mappings | string;
  rota: keyof PrivateStackParamList;
}

const FooterComponent = ({ tipoPerfil }: FooterProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();

  // Dicionário de menus limpo, mapeado rigorosamente com os tipos das rotas privadas
  const menus: Record<"funcionario" | "rh" | "gestor", MenuItem[]> = {
    funcionario: [
      { id: 1, label: "Home", icon: "home-outline", rota: "Home" },
      { id: 2, label: "Hours", icon: "time-outline", rota: "Horas" },
      { id: 3, label: "Profile", icon: "person-outline", rota: "Perfil" },
    ],
    rh: [
      { id: 4, label: "Users List", icon: "people-outline", rota: "ListaUsuario" },
      { id: 5, label: "Register", icon: "person-add-outline", rota: "RegistrarUsuario" },
    ],
    gestor: [
      { id: 6, label: "Dashboard", icon: "grid-outline", rota: "Dashboard" },
      { id: 7, label: "Tracking", icon: "eye-outline", rota: "ListaFuncionarios" },
      { id: 8, label: "Payments", icon: "cash-outline", rota: "PagamentoHoras" },
    ],
  };

  const botoesTipoPerfil = menus[tipoPerfil] || [];

  return (
    <View style={styles.container}>
      {botoesTipoPerfil.map((botao) => (
        <TouchableOpacity 
          key={botao.id} 
          style={styles.menuItem} 
          onPress={() => navigation.navigate(botao.rota)}
        >
          <Ionicons name={botao.icon as any} size={24} color="#ffffff" />
          <Text style={styles.menuLabel}>{botao.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterComponent;