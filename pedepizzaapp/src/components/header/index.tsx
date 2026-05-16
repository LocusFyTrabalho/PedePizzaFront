import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "@/utils/themeColors";

const HeaderComponent = () => {
  
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-forward" size={22} color="#1a1a1a" />
    </View>
  );
};

export default HeaderComponent;
