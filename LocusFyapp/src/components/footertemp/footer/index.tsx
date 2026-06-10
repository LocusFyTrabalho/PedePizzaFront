import React from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface FooterProps {
  tipoPerfil: "temp";
}

const FooterComponentTemp = ({ tipoPerfil }: FooterProps) => {
  const navigation = useNavigation<any>();

  const menus = {
    temp: [
      { id: 1, label: "Home", icon: "home-outline", rota: "Home" },
      { id: 2, label: "Hours", icon: "time-outline", rota: "Horas" },
      { id: 3, label: "Profile", icon: "person-outline", rota: "Perfil" },
      { id: 4, label: "Users List", icon: "people-outline", rota: "ListaUsuario" },
      { id: 5, label: "Register", icon: "person-add-outline", rota: "RegistrarUsuario" },
      { id: 6, label: "Dashboard", icon: "grid-outline", rota: "Dashboard" },
      { id: 7, label: "Tracking", icon: "eye-outline", rota: "ListaFuncionarios" },
      { id: 8, label: "Payments", icon: "cash-outline", rota: "PagamentoHoras" },
    ],
  };

  const botoesTipoPerfil = menus[tipoPerfil];

  return (
    <View style={localStyles.devContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={localStyles.scrollContent}
      >
        {botoesTipoPerfil.map((botao) => (
          <TouchableOpacity 
            key={botao.id} 
            style={localStyles.devMenuItem} 
            onPress={() => navigation.navigate(botao.rota)}
          >
            <Ionicons name={botao.icon as any} size={22} color="#ffffff" />
            <Text style={localStyles.devMenuLabel}>{botao.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos locais e isolados para não depender de arquivos externos de estilos
const localStyles = StyleSheet.create({
  devContainer: {
    backgroundColor: "#1E293B", // Um fundo escuro elegante para o modo dev
    height: 70,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#334155",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 20,
  },
  devMenuItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 75,
  },
  devMenuLabel: {
    fontSize: 11,
    marginTop: 2,
    color: "#ffffff",
    fontWeight: "500",
  }
});

export default FooterComponentTemp;