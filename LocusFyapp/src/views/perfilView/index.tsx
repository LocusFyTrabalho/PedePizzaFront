import ButtonComponent from "@/components/button";
import React, { useCallback } from "react";
import { Text, Image, TouchableOpacity, View, FlatList, _View } from "react-native";
import { styles } from "./styles";
import HeaderComponent from "@/components/header";
import { useNavigation } from "@react-navigation/native";
import FooterComponent from "@/components/footer";
import { TextInput } from "react-native";

const PerfilView = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <HeaderComponent />
      {/*foto de perfil*/}
      <View style={styles.content}>
        <View style={styles.perfilContainer}>
          <Image
            source={{}}
            style={styles.fotodeperfil}
          />

        </View>


        <View style={styles.infodadosContainer}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.inputDisabled}
            value="Locusfy"
            editable={false}
          />
          <Text style={styles.label}>Date of Admission</Text>
          <Text style={styles.inputDisabled}>2010/10/10</Text>

          <Text style={styles.label}>Accumulated hours</Text>
          <Text style={styles.infoBox}>10 hours</Text>

        </View>

        <FooterComponent tipoPerfil="funcionario" />
      </View>
    </View>




  );
};

export default PerfilView;
