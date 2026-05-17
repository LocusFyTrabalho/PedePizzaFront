import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";



const pedidoView = () => {
  

  return (
    <View style={styles.container}>
      <HeaderComponent />


    </View>
  );
};

export default pedidoView;
