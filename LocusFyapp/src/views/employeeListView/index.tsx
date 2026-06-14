import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import InputComponent from "@/components/input";
import FooterComponent from "@/components/footer";
import { Ionicons } from "@expo/vector-icons";

interface Employee {
  id: string;
  name: string;
  status: "Working" | "Not Working";
  lastLocation: string;
}

// Recebendo o navigation pelas props do componente
const EmployeeListView = ({ navigation }: any) => {
  const [employees] = useState<Employee[]>([
    { id: "1", name: "John Doe", status: "Working", lastLocation: "Office Block A" },
    { id: "2", name: "Alice Smith", status: "Not Working", lastLocation: "Home Office" },
    { id: "3", name: "Bob Johnson", status: "Working", lastLocation: "External Client HQ" },
  ]);

  const renderEmployeeItem = ({ item }: { item: Employee }) => {
    const isWorking = item.status === "Working";

    return (
      <View style={styles.employeeCard}>
        <Text style={styles.employeeName}>{item.name}</Text>

        <Text style={styles.fieldLabel}>Current Status</Text>
        <InputComponent
          value={item.status}
          editable={false}
          inputStyle={{ color: isWorking ? "#10B981" : "#EF4444", fontWeight: "700" }}
        />

        <Text style={styles.fieldLabel}>Last Clock-in Location</Text>
        <InputComponent
          value={item.lastLocation}
          editable={false}
        />

        {/* Botão que leva para a tela do Mapa */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => navigation.navigate("Mapa", {
            employeeName: item.name,
            employeeCoords: (item as any).coords // Passando o objeto com lat e lng
          })}
        >
          <Ionicons name="location-outline" size={20} color="#FFFFFF" />
          <Text style={styles.locationButtonText}>Ver no Mapa</Text>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.logoText}>LocusFy</Text>
        </View>
        <Text style={styles.sloganText}>Employee Tracking</Text>
      </View>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployeeItem}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 24 }]}
        style={styles.formScrollView}
      />

      <FooterComponent />
    </View>
  );
};

export default EmployeeListView;