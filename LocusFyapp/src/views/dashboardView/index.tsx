import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";

const DashboardView = () => {
  // Simulando dados vindo do Spring Boot
  const [stats] = useState({
    totalEmployees: 12,
    workingNow: 8,
    notWorkingNow: 4,
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.logoText}>LocusFy</Text>
        </View>
        <Text style={styles.sloganText}>Manager Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.formScrollView}>
        
        <View style={localStyles.cardTotal}>
          <Text style={localStyles.cardTitle}>Total Employees</Text>
          <Text style={localStyles.cardValue}>{stats.totalEmployees}</Text>
        </View>

        <View style={localStyles.rowCards}>
          <View style={[localStyles.cardStatus, { borderColor: "#10B981" }]}>
            <Text style={[localStyles.statusTitle, { color: "#10B981" }]}>Working Now</Text>
            <Text style={localStyles.cardValue}>{stats.workingNow}</Text>
          </View>

          <View style={[localStyles.cardStatus, { borderColor: "#EF4444" }]}>
            <Text style={[localStyles.statusTitle, { color: "#EF4444" }]}>Not Working</Text>
            <Text style={localStyles.cardValue}>{stats.notWorkingNow}</Text>
          </View>
        </View>

      </ScrollView>

      <FooterComponent tipoPerfil="gestor" />
    </View>
  );
};



export default DashboardView;