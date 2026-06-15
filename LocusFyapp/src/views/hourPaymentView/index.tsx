import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, RefreshControl } from "react-native";
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

function parseDurationToHours(iso: string | null): number {
  if (!iso) return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = match?.[1] ? parseInt(match[1]) : 0;
  const minutes = match?.[2] ? parseInt(match[2]) : 0;
  return hours + minutes / 60;
}

interface PaymentItem {
  id: number;
  name: string;
  hourlyRate: number;
  accumulatedHours: number;
  totalPayment: number;
  hasPendingHours: boolean;
}

const HourPaymentView = () => {
  const [employees, setEmployees] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<PaymentItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await api.get<EmployeeDTO[]>('/employee');
      const mapped: PaymentItem[] = response.data.map((emp) => {
        const hours = parseDurationToHours(emp.workedHours);
        const total = emp.salary * hours;
        return {
          id: emp.id,
          name: emp.name,
          hourlyRate: emp.salary,
          accumulatedHours: hours,
          totalPayment: total,
          hasPendingHours: hours > 0,
        };
      });
      setEmployees(mapped);
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

  const handleOpenConfirmation = (item: PaymentItem) => {
    setSelectedEmployee(item);
    setIsModalVisible(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedEmployee) return;

    setProcessingId(selectedEmployee.id);
    setIsModalVisible(false);

    try {
      await api.post('/payment', { employeeId: selectedEmployee.id });
      await loadData(); // recarrega para refletir o reset das horas
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    } finally {
      setProcessingId(null);
      setSelectedEmployee(null);
    }
  };

  const renderPaymentItem = ({ item }: { item: PaymentItem }) => {
    const isProcessing = processingId === item.id;

    return (
      <View style={styles.cardContainer}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.dateText}>Rate: ${item.hourlyRate.toFixed(2)}/h</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={22} color="#000" style={styles.icon} />
          <Text style={styles.infoText}>{item.accumulatedHours.toFixed(2)} hours logged</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={22} color="#000" style={styles.icon} />
          <Text style={[styles.infoText, { fontWeight: "700", color: "#00873A" }]}>
            Total: ${item.totalPayment.toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, item.hasPendingHours ? styles.badgeUnpaid : styles.badgePaid]}>
            <View style={[styles.statusDot, item.hasPendingHours ? styles.dotUnpaid : styles.dotPaid]} />
            <Text style={styles.statusText}>{item.hasPendingHours ? "Pending" : "Up to date"}</Text>
          </View>

          {item.hasPendingHours ? (
            <TouchableOpacity
              style={[styles.mapButton, { backgroundColor: "#1A1A1A", paddingHorizontal: 12, width: "auto" }]}
              onPress={() => handleOpenConfirmation(item)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>Confirm Pay</Text>
              )}
            </TouchableOpacity>
          ) : (
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          )}
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
        <Text style={styles.sloganText}>Hour Payments</Text>
      </View>

      {employees.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
          <Text style={{ color: "#6B7280", textAlign: "center", fontSize: 16 }}>
            No employees found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPaymentItem}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 24, paddingBottom: 120 }]}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 24 }}>
          <View style={{ backgroundColor: "#FFFFFF", width: "100%", borderRadius: 24, padding: 24, alignItems: "center" }}>
            <Ionicons name="alert-circle-outline" size={54} color="#EF4444" style={{ marginBottom: 16 }} />

            <Text style={{ fontSize: 20, fontWeight: "800", color: "#1F2937", marginBottom: 8, textAlign: "center" }}>
              Confirm Payment?
            </Text>

            <Text style={{ fontSize: 15, color: "#4B5563", textAlign: "center", marginBottom: 24, lineHeight: 22 }}>
              Are you sure you want to release the payment of{" "}
              <Text style={{ fontWeight: "700", color: "#000" }}>
                ${selectedEmployee?.totalPayment.toFixed(2)}
              </Text>{" "}
              to <Text style={{ fontWeight: "700", color: "#000" }}>{selectedEmployee?.name}</Text>?
            </Text>

            <Text style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", marginBottom: 24 }}>
              This will reset the employee's accumulated hours to zero.
            </Text>

            <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
              <TouchableOpacity
                style={{ flex: 1, backgroundColor: "#F3F4F6", paddingVertical: 14, borderRadius: 12, alignItems: "center" }}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: "#4B5563", fontWeight: "700", fontSize: 15 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1, backgroundColor: "#EF4444", paddingVertical: 14, borderRadius: 12, alignItems: "center" }}
                onPress={handleConfirmPayment}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 15 }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FooterComponent />
    </View>
  );
};

export default HourPaymentView;