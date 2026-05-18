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


      <Image
        source={require("../../../assets/PedePizzaLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default HeaderComponent;