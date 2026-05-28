import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { FONT_SIZE } from "@/utils/themeColors";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = () => {
  const navigation = useNavigation<any>();
  return (
   <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>

      </TouchableOpacity>

      <View style={styles.logoContainer}>
        
      </View>


    </View>
  );
};

export default HeaderComponent;