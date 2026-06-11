import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";

// Trocado pelo Footer temporário de desenvolvimento rápido
import  FooterComponent  from "@/components/footer";

const DashboardView = () => {
  // Simulando dados vindo do Spring Boot
  const [stats] = useState({
    totalEmployees: 12,
    workingNow: 8,
    notWorkingNow: 4,
  });

  return (
    <View style={styles.container}>
      {/* O Header agora puxa os estilos válidos mapeados no styles.ts */}
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.logoText}>LocusFy</Text>
        </View>
        <Text style={styles.sloganText}>Manager Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.formScrollView}>
        
        <View style={styles.cardTotal}>
          <Text style={styles.cardTitle}>Total Employees</Text>
          <Text style={styles.cardValue}>{stats.totalEmployees}</Text>
        </View>

        <View style={styles.rowCards}>
          <View style={[styles.cardStatus, { borderColor: "#10B981" }]}>
            <Text style={[styles.statusTitle, { color: "#10B981" }]}>Working Now</Text>
            <Text style={styles.cardValue}>{stats.workingNow}</Text>
          </View>

          <View style={[styles.cardStatus, { borderColor: "#EF4444" }]}>
            <Text style={[styles.statusTitle, { color: "#EF4444" }]}>Not Working</Text>
            <Text style={styles.cardValue}>{stats.notWorkingNow}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Injetado o Rodapé de Desenvolvimento */}
      <FooterComponent/>
    </View>
  );
};

export default DashboardView;