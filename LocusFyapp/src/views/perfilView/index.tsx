import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";
import { useNavigation } from "@react-navigation/native";
import FooterComponent from "@/components/footer";

const PerfilView = () => {

  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ButtonComponent title="Voltar" onPress={() => navigation.goBack()} />
      <FooterComponent tipoPerfil="funcionario" />
    </View>
  );
};

export default PerfilView;
