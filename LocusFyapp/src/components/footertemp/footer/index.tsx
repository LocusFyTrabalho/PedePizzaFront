import React from "react";
import ButtonComponent from "@/components/button";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";
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
            { id: 4, label: "Users Registration", icon: "person-add-outline", rota: "RegistrarUsuario" },
            { id: 5, label: "Users List", icon: "people-outline", rota: "ListaUsuario" },

        ],
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

export default FooterComponentTemp;
