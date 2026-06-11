import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import InputComponent from "@/components/input";

// Importando o footer temporário para testes rápidos
import FooterComponent from "@/components/footer";

interface PaymentEmployee {
  id: string;
  name: string;
  accumulatedHours: string;
  paymentStatus: "Paid" | "Not Paid";
}

const HourPaymentView = () => {
  // Estado mutável simulando a resposta da sua API do Spring Boot
  const [employees, setEmployees] = useState<PaymentEmployee[]>([
    { id: "1", name: "John Doe", accumulatedHours: "160 hours", paymentStatus: "Not Paid" },
    { id: "2", name: "Alice Smith", accumulatedHours: "142 hours", paymentStatus: "Paid" },
    { id: "3", name: "Bob Johnson", accumulatedHours: "175 hours", paymentStatus: "Not Paid" },
  ]);

  // Função que altera o status do pagamento localmente
  const handleMarkAsPaid = (id: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, paymentStatus: "Paid" } : emp
      )
    );
  };

  const renderPaymentItem = ({ item }: { item: PaymentEmployee }) => {
    const isPaid = item.paymentStatus === "Paid";

    return (
      // Corrigido de localStyles para styles
      <View style={styles.paymentCard}>
        <Text style={styles.employeeName}>{item.name}</Text>

        <Text style={styles.fieldLabel}>Accumulated Hours</Text>
        <InputComponent value={item.accumulatedHours} editable={false} />

        <Text style={styles.fieldLabel}>Payment Status</Text>
        <InputComponent 
          value={item.paymentStatus} 
          editable={false} 
          inputStyle={{
            color: isPaid ? "#10B981" : "#EF4444",
            fontWeight: "700"
          }}
        />

        {!isPaid && (
          <TouchableOpacity 
            style={styles.payButton} 
            onPress={() => handleMarkAsPaid(item.id)}
          >
            <Text style={styles.payButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        )}
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

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentItem}
        contentContainerStyle={styles.scrollContent}
        style={styles.formScrollView}
      />

      {/* Menu flutuante do desenvolvedor ativo */}
      <FooterComponent />
    </View>
  );
};

export default HourPaymentView;