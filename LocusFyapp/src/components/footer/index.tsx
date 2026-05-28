import React from "react";
import ButtonComponent from "@/components/button";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";
interface FooterProps {
    tipoPerfil: "funcionario" | "RH" ;
}
// interface FooterProps {
//     tipoPerfil: "funcionario" | "RH" | "gestor";
// }
const FooterComponent = ({ tipoPerfil }: FooterProps) => {
    const navigation = useNavigation<any>();

    const menus = {
        funcionario: [
            { id: 1, label: "Home", icon: "home", rota: "Home" },
            { id: 2, label: "Horas", icon: "time-outline", rota: "Horas" },
            { id: 3, label: "Perfil", icon: "person-outline", rota: "Perfil" },
            { id: 4, label: "CadastroUsuario", icon: "", rota: "RegistrarUsuario" },
        ],
        RH: [
            { id: 3, label: "Cardápio", icon: "restaurant-outline", rota: "EditarCardapio" },
            { id: 2, label: "Pedidos", icon: "list-circle-outline", rota: "AceitarPedido" },
            { id: 1, label: "Dashboard", icon: "bar-chart-outline", rota: "Dashboard" },
        ],
        // gestor: [
        //     { id: 1, label: "Dashboard", icon: "bar-chart-outline", rota: "Dashboard" },
        //     { id: 2, label: "Funcionários", icon: "people-outline", rota: "Funcionarios" },
        //     { id: 3, label: "Relatórios", icon: "document-text-outline", rota: "Relatorios" },
        // ]
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
