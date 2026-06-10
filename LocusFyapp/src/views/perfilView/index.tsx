import React from "react";
import { Text, Image, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import InputComponent from "@/components/input";
import FooterComponent from "@/components/footer";

const PerfilView = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Profile Picture Container */}
        <View style={styles.perfilContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/130' }} // Placeholder válido para evitar quebra
            style={styles.fotodeperfil}
          />
        </View>

        {/* Profile Data Inputs */}
        <View style={styles.infodadosContainer}>
          <Text style={styles.label}>Company</Text>
          <InputComponent 
            value="Locusfy" 
            editable={false} 
          />

          <Text style={styles.label}>Date of Admission</Text>
          <InputComponent 
            value="2010/10/10" 
            editable={false} 
          />

          <Text style={styles.label}>Accumulated Hours</Text>
          <InputComponent 
            value="10 hours" 
            editable={false} 
          />
        </View>

      </ScrollView>
      <FooterComponent tipoPerfil="funcionario" />
    </View>
  );
};

export default PerfilView;