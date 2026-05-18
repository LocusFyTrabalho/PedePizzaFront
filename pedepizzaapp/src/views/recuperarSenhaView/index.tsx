import ButtonComponent from "@/components/button/index";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";



const RecuperarSenhaView = () => {
  

  return (
    <View style={styles.container}>
      <HeaderComponent />

      
      <ButtonComponent title="Avançar" onPress={() => {}} />
      <ButtonComponent title="Voltar" onPress={() => {}} />


    </View>
  );
};

export default RecuperarSenhaView;
