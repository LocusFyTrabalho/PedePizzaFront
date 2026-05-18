import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";
import { useNavigation } from "@react-navigation/native";


const CadastreseView = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      
      <ButtonComponent title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CadastreseView;
