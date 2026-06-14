import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "./styles";
import InputComponent from "@/components/input";
import FooterComponent from "@/components/footer";

const PerfilView = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.perfilContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/130' }} 
            style={styles.fotodeperfil}
          />
        </View>

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
      <FooterComponent />
    </View>
  );
};

export default PerfilView;