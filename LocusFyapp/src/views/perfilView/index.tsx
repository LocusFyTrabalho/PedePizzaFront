import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import InputComponent from "@/components/input";
import FooterComponent from "@/components/footer";
import api from "@/api";

interface EmployeeDTO {
  id: number;
  name: string;
  email: string;
  salary: number;
  workedHours: string | null; 
}

function formatWorkedHours(iso: string | null): string {
  if (!iso) return "0h 0m";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = match?.[1] ? parseInt(match[1]) : 0;
  const minutes = match?.[2] ? parseInt(match[2]) : 0;
  return `${hours}h ${minutes}m`;
}

const PerfilView = () => {
  const [employee, setEmployee] = useState<EmployeeDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    setLoading(true);
    try {
      const response = await api.get('/employee/me');
      setEmployee(response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
          <Text style={styles.label}>Name</Text>
          <InputComponent 
            value={employee?.name ?? ""} 
            editable={false} 
          />

          <Text style={styles.label}>Email</Text>
          <InputComponent 
            value={employee?.email ?? ""} 
            editable={false} 
          />

          <Text style={styles.label}>Company</Text>
          <InputComponent 
            value="Locusfy" 
            editable={false} 
          />

          <Text style={styles.label}>Accumulated Hours</Text>
          <InputComponent 
            value={formatWorkedHours(employee?.workedHours ?? null)} 
            editable={false} 
          />
        </View>

      </ScrollView>
      <FooterComponent />
    </View>
  );
};

export default PerfilView;