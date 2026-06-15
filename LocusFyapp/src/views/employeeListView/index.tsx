import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
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
  latitude: number | null;
  longitude: number | null;
}

interface TrackedEmployee {
  id: number;
  name: string;
  status: "Working" | "Off";
  date: string;
  time: string;
  coords: { latitude: number; longitude: number } | null;
}

const EmployeeListView = ({ navigation }: any) => {
  const [employees, setEmployees] = useState<TrackedEmployee[]>([]);
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

      const employeesList = employeesRes.data;
      const points = pointsRes.data;

      const tracked: TrackedEmployee[] = employeesList.map((emp) => {

        const openRecord = points
          .filter((p) => p.employeeId === emp.id && p.endTime === null)
          .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

        if (openRecord) {
          return {
            id: emp.id,
            name: emp.name,
            status: "Working" as const,
            date: openRecord.date,
            time: openRecord.startTime ?? "--:--",
            coords: (openRecord.latitude != null && openRecord.longitude != null)
              ? { latitude: openRecord.latitude, longitude: openRecord.longitude }
              : null,
          };
        }

        return {
          id: emp.id,
          name: emp.name,
          status: "Off" as const,
          date: "-",
          time: "--:--",
          coords: null,
        };
      });

      // Ordena: "Working" primeiro, depois "Off". Dentro de cada grupo, ordena por nome.
      const sorted = tracked.sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === "Working" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

      setEmployees(sorted);
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

  const renderEmployeeItem = ({ item }: { item: TrackedEmployee }) => {
    const isWorking = item.status === "Working";

    return (
      <View style={styles.cardContainer}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.dateText}>{item.date}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={22} color="#000" style={styles.icon} />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={22} color="#000" style={styles.icon} />
          <Text style={styles.infoText}>
            {isWorking && item.coords
              ? `Lat: ${item.coords.latitude.toFixed(5)}, Lng: ${item.coords.longitude.toFixed(5)}`
              : "Not Clocked In"}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, isWorking ? styles.badgeWorking : styles.badgeNotWorking]}>
            <View style={[styles.statusDot, isWorking ? styles.dotWorking : styles.dotNotWorking]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>

          <TouchableOpacity
            style={[styles.mapButton, !(isWorking && item.coords) && { backgroundColor: "#9CA3AF" }]}
            disabled={!(isWorking && item.coords)}
            onPress={() => navigation.navigate("Mapa", {
              employeeName: item.name,
              employeeCoords: item.coords
            })}
          >
            <Ionicons name="map-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
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
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.logoText}>LocusFy</Text>
        </View>
        <Text style={styles.sloganText}>Employee Tracking</Text>
      </View>

      {employees.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
          <Text style={{ color: "#6B7280", textAlign: "center", fontSize: 16 }}>
            No employees registered.
          </Text>
        </View>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEmployeeItem}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 24, paddingBottom: 120 }]}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <FooterComponent />
    </View>
  );
};

export default EmployeeListView;