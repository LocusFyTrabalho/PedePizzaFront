import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";
import { useNavigation } from "@react-navigation/native";
import FooterComponent from "@/components/footer";

const PedidoView = () => {

  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <HeaderComponent />
      
      <FooterComponent tipoPerfil="cliente" />
    </View>
  );
};

export default PedidoView;
