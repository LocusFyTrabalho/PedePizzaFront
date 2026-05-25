import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = () => {
  const navigation = useNavigation<any>();
  return (
   <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image 
          source={require("../../../assets/PedePizzaLogo.png")} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.botaoHistorico} onPress={() => navigation.navigate("Historico")}>
        <Ionicons name="receipt-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;