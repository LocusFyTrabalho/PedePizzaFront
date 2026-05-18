import React from "react";
import ButtonComponent from "@/components/button";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";
interface FooterProps {
    tipoPerfil: "cliente" | "pizzaria";
}
const FooterComponent = ({ tipoPerfil }: FooterProps) => {
    const navigation = useNavigation<any>();

    const menus = {
        cliente: [
            { id: 1, label: "Cardápio", icon: "pizza-outline", rota: "Home" },
            { id: 2, label: "Carrinho", icon: "cart-outline", rota: "Carrinho" },
            { id: 3, label: "Perfil", icon: "person-outline", rota: "Perfil" },
        ],
        pizzaria: [
            { id: 3, label: "Cardápio", icon: "restaurant-outline", rota: "EditarCardapio" },
            { id: 2, label: "Pedidos", icon: "list-circle-outline", rota: "AceitarPedido" },
            { id: 1, label: "Dashboard", icon: "bar-chart-outline", rota: "Dashboard" },
        ]
    };
    const botoesTipoPerfil = menus[tipoPerfil];

    return (
        <View style={styles.container}>
            {botoesTipoPerfil.map((botao) => (
                <TouchableOpacity key={botao.id} style={styles.menuItem} onPress={() => navigation.navigate(botao.rota)}>
                    <Ionicons name={botao.icon as any} size={24} color="#333" />
                    <Text style={styles.menuLabel}>{botao.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default FooterComponent;
