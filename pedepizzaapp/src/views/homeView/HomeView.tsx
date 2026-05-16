import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "@/types/navigationTypes";
import HeaderComponent from "@/components/header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeView = () => {
  // const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <HeaderComponent />


    </View>
  );
};

export default HomeView;
