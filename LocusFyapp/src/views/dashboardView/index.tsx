import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";
import api from "@/api";

interface EmployeeDTO {
  id: number;
  name: string;
  email: string;
  salary: number;
  workedHours: string | null;
}

interface PointRecordDTO {
  id: number;
  startTime: string | null;
  endTime: string | null;
  date: string;
  employeeId: number;
}

const DashboardView = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [workingNow, setWorkingNow] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [employeesRes, pointsRes] = await Promise.all([
        api.get<EmployeeDTO[]>('/employee'),
        api.get<PointRecordDTO[]>('/point'),
      ]);

      const employees = employeesRes.data;
      const points = pointsRes.data;

      
      const workingEmployeeIds = new Set(
        points.filter((p) => p.endTime === null).map((p) => p.employeeId)
      );

      setTotalEmployees(employees.length);
      setWorkingNow(workingEmployeeIds.size);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const notWorkingNow = totalEmployees - workingNow;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.logoText}>LocusFy</Text>
        </View>
        <Text style={styles.sloganText}>Manager Dashboard</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.formScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        <View style={styles.cardTotal}>
          <Text style={styles.cardTitle}>Total Employees</Text>
          <Text style={styles.cardValue}>{totalEmployees}</Text>
        </View>

        <View style={styles.rowCards}>
          <View style={[styles.cardStatus, { borderColor: "#10B981" }]}>
            <Text style={[styles.statusTitle, { color: "#10B981" }]}>Working Now</Text>
            <Text style={styles.cardValue}>{workingNow}</Text>
          </View>

          <View style={[styles.cardStatus, { borderColor: "#EF4444" }]}>
            <Text style={[styles.statusTitle, { color: "#EF4444" }]}>Not Working</Text>
            <Text style={styles.cardValue}>{notWorkingNow}</Text>
          </View>
        </View>

      </ScrollView>

      <FooterComponent/>
    </View>
  );
};

export default DashboardView;