import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { styles } from "./styles"; 
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "@/context/UserContext";
import FooterComponent from "@/components/footer";

const HourPaymentView = () => {
  const { users } = useContext(UserContext);

  // Controle do fluxo do Modal de confirmação
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string; amount: number } | null>(null);
  const [paidUsersList, setPaidUsersList] = useState<string[]>([]);

  // Abre o modal passando os dados do funcionário selecionado
  const handleOpenConfirmation = (id: string, name: string, amount: number) => {
    setSelectedEmployee({ id, name, amount });
    setIsModalVisible(true);
  };

  // Confirma o pagamento de fato dentro do Modal
  const handleConfirmPayment = () => {
    if (selectedEmployee) {
      setPaidUsersList((prev) => [...prev, selectedEmployee.id]);
    }
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  // Filtra e mapeia os funcionários (ROLE_EMPLOYEE)
  const paymentEmployees = users
    .filter((user) => user.role === "ROLE_EMPLOYEE")
    .map((user, index) => {
      const isPaidLocal = paidUsersList.includes(user.id);
      const rate = parseFloat(user.hourlyRate) || 0;
      const hours = 120 + (index * 15); 

      return {
        id: user.id,
        name: user.name,
        accumulatedHours: hours,
        hourlyRate: rate,
        paymentStatus: isPaidLocal ? ("Paid" as const) : (index % 2 === 0 ? ("Paid" as const) : ("Not Paid" as const)),
      };
    });

  const renderPaymentItem = ({ item }: { item: typeof paymentEmployees[0] }) => {
    const isPaid = item.paymentStatus === "Paid";
    const totalPayment = item.accumulatedHours * item.hourlyRate;

    return (
      <View style={styles.cardContainer}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.dateText}>Rate: ${item.hourlyRate.toFixed(2)}/h</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={22} color="#000" style={styles.icon} />
          <Text style={styles.infoText}>{item.accumulatedHours} hours logged</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={22} color="#000" style={styles.icon} />
          <Text style={[styles.infoText, { fontWeight: "700", color: "#00873A" }]}>
            Total: ${totalPayment.toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, isPaid ? styles.badgePaid : styles.badgeUnpaid]}>
            <View style={[styles.statusDot, isPaid ? styles.dotPaid : styles.dotUnpaid]} />
            <Text style={styles.statusText}>{isPaid ? "Paid" : "Unpaid"}</Text>
          </View>

          {!isPaid ? (
            <TouchableOpacity
              style={[styles.mapButton, { backgroundColor: "#1A1A1A", paddingHorizontal: 12, width: "auto" }]}
              onPress={() => handleOpenConfirmation(item.id, item.name, totalPayment)}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>Confirm Pay</Text>
            </TouchableOpacity>
          ) : (
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          )}
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
        <Text style={styles.sloganText}>Hour Payments</Text>
      </View>

      {paymentEmployees.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
          <Text style={{ color: "#6B7280", textAlign: "center", fontSize: 16 }}>
            No eligible employees found for hours payment.
          </Text>
        </View>
      ) : (
        <FlatList
          data={paymentEmployees}
          keyExtractor={(item) => item.id}
          renderItem={renderPaymentItem}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 24, paddingBottom: 120 }]}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* MODAL DE CONFIRMAÇÃO DE PAGAMENTO */}
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
                ${selectedEmployee?.amount.toFixed(2)}
              </Text>{" "}
              to <Text style={{ fontWeight: "700", color: "#000" }}>{selectedEmployee?.name}</Text>?
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