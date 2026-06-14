import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles"; 
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "@/context/UserContext";
import FooterComponent from "@/components/footer";

const HourPaymentView = () => {
  // Consumindo a lista de usuários reais cadastrados pelo RH
  const { users } = useContext(UserContext);

  // Estado local para controlar quais IDs já foram marcados como pagos neste ciclo
  const [paidUsersList, setPaidUsersList] = useState<string[]>([]);

  const handleMarkAsPaid = (id: string) => {
    setPaidUsersList((prev) => [...prev, id]);
  };

  // Mapeia os usuários do contexto para a estrutura de pagamentos
  const paymentEmployees = users.map((user, index) => {
    const isPaidLocal = paidUsersList.includes(user.id);
    
    // Converte a string hourlyRate do contexto para número (padrão 0 se falhar)
    const rate = parseFloat(user.hourlyRate) || 0;
    
    // Gera horas acumuladas fictícias baseadas no index para exibição em tela
    const hours = 120 + (index * 15); 

    return {
      id: user.id,
      name: user.name,
      accumulatedHours: hours,
      hourlyRate: rate,
      // Se já foi clicado localmente, assume "Paid", senão usa lógica padrão baseada no index
      paymentStatus: isPaidLocal ? ("Paid" as const) : (index % 2 === 0 ? ("Paid" as const) : ("Not Paid" as const)),
    };
  });

  const renderPaymentItem = ({ item }: { item: typeof paymentEmployees[0] }) => {
    const isPaid = item.paymentStatus === "Paid";
    const totalPayment = item.accumulatedHours * item.hourlyRate;

    return (
      <View style={styles.cardContainer}>
        {/* Nome do Funcionário */}
        <Text style={styles.employeeName}>{item.name}</Text>

        {/* Detalhe do Ganho por Hora dinâmico do Contexto */}
        <Text style={styles.dateText}>Rate: ${item.hourlyRate.toFixed(2)}/h</Text>

        {/* Linha das Horas Acumuladas */}
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={22} color="#000" style={styles.icon} />
          <Text style={styles.infoText}>{item.accumulatedHours} hours logged</Text>
        </View>

        {/* Linha do Total a Receber */}
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={22} color="#000" style={styles.icon} />
          <Text style={[styles.infoText, { fontWeight: "700", color: "#00873A" }]}>
            Total: ${totalPayment.toFixed(2)}
          </Text>
        </View>

        {/* Rodapé do Card */}
        <View style={styles.cardFooter}>
          {/* Badge de Status */}
          <View style={[styles.statusBadge, isPaid ? styles.badgePaid : styles.badgeUnpaid]}>
            <View style={[styles.statusDot, isPaid ? styles.dotPaid : styles.dotUnpaid]} />
            <Text style={styles.statusText}>{isPaid ? "Paid" : "Unpaid"}</Text>
          </View>

          {/* Botão de Ação */}
          {!isPaid ? (
            <TouchableOpacity
              style={[styles.mapButton, { backgroundColor: "#1A1A1A", paddingHorizontal: 12, width: "auto" }]}
              onPress={() => handleMarkAsPaid(item.id)}
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
            No employees registered by HR yet.
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

      <FooterComponent />
    </View>
  );
};

export default HourPaymentView;