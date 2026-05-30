import React from "react";
import ButtonComponent from "@/components/button";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";
interface FooterProps {
    tipoPerfil: "funcionario" | "RH" | "gestor";
}

const FooterComponent = ({ tipoPerfil }: FooterProps) => {
    const navigation = useNavigation<any>();

    const menus = {
        funcionario: [
            { id: 1, label: "Home", icon: "home-outline", rota: "Home" },
            { id: 2, label: "Hours", icon: "time-outline", rota: "Horas" },
            { id: 3, label: "Profile", icon: "person-outline", rota: "Perfil" },
            
        ],
        RH: [
            { id: 1, label: "Register User", icon: "person-add-outline", rota: "RegistrarUsuario" },
            { id: 2, label: "Emplooyes list", icon: "clipboard-outline", rota: "AceitarPedido" },
           // { id: 3, label: "Dashboard", icon: "bar-chart-outline", rota: "Dashboard" },
        ],
        gestor: [
            { id: 1, label: "Register User", icon: "person-add-outline", rota: "Dashboard" },
            { id: 2, label: "Emplooyes list", icon: "clipboard-outline", rota: "Funcionarios" },
            { id: 3, label: "Payment", icon: "cash-outline", rota: "Relatorios" },
        ]
    };
    const botoesTipoPerfil = menus[tipoPerfil];

    return (
        <View style={styles.container}>
            {botoesTipoPerfil.map((botao) => (
                <TouchableOpacity key={botao.id} style={styles.menuItem} onPress={() => navigation.navigate(botao.rota)}>
                    <Ionicons name={botao.icon as any} size={24} color="#ffffff" />
                    <Text style={styles.menuLabel}>{botao.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default FooterComponent;
