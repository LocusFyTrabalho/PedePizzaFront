import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles"; 
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "@/context/UserContext";
import FooterComponent from "@/components/footer";

const EmployeeListView = ({ navigation }: any) => {
  const { users } = useContext(UserContext);

  // Filtra para garantir que apenas funcionários comuns (ROLE_EMPLOYEE) apareçam na tela de tracking
  const trackedEmployees = users
    .filter((user) => user.role === "ROLE_EMPLOYEE")
    .map((user, index) => {
      const isWorking = index % 2 === 0; 
      
      return {
        id: user.id,
        name: user.name,
        status: isWorking ? ("Working" as const) : ("Not Working" as const),
        date: "Today - June 14",
        time: isWorking ? "08:00" : "--:--",
        lastLocation: isWorking ? "Av. Tancredo Neves, 3500" : "Not Clocked In",
        coords: { latitude: -19.53052 - (index * 0.005), longitude: -42.623308 + (index * 0.005) }
      };
    });

  const renderEmployeeItem = ({ item }: { item: typeof trackedEmployees[0] }) => {
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
          <Text style={styles.infoText}>{item.lastLocation}</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, isWorking ? styles.badgeWorking : styles.badgeNotWorking]}>
            <View style={[styles.statusDot, isWorking ? styles.dotWorking : styles.dotNotWorking]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>

          <TouchableOpacity
            style={[styles.mapButton, !isWorking && { backgroundColor: "#9CA3AF" }]}
            disabled={!isWorking}
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.logoText}>LocusFy</Text>
        </View>
        <Text style={styles.sloganText}>Employee Tracking</Text>
      </View>

      {trackedEmployees.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
          <Text style={{ color: "#6B7280", textAlign: "center", fontSize: 16 }}>
            No employees currently working or registered.
          </Text>
        </View>
      ) : (
        <FlatList
          data={trackedEmployees}
          keyExtractor={(item) => item.id}
          renderItem={renderEmployeeItem}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 24, paddingBottom: 120 }]}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FooterComponent />
    </View>
  );
};

export default EmployeeListView;