import ButtonComponent from "@/components/button";
import FooterComponent from "@/components/footer";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";
import { useNavigation } from "@react-navigation/native";


const HomeView = () => {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ButtonComponent title="Histórico" onPress={() => navigation.navigate("Historico")} />
      <ButtonComponent title="Pedido" onPress={() => navigation.navigate("Pedido")} />
      <FooterComponent tipoPerfil="cliente" />

    </View>
  );
};

export default HomeView;
