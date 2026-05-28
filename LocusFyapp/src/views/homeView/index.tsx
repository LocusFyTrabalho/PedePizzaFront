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
      
      <FooterComponent tipoPerfil="funcionario" />

    </View>
  );
};

export default HomeView;
