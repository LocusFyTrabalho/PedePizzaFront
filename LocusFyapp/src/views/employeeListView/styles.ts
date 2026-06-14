import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Fundo cinza claro padrão
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
  },
  sloganText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  formScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 120, // Garante que o FooterComponent não cubra o último card
  },

  // ==========================================
  // NOVOS ESTILOS DOS CARDS (PADRÃO ATUALIZADO)
  // ==========================================
  cardContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: "25%", // Alinhamento centralizado deslocado para a esquerda
  },
  icon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 140, // Aumentado um pouco para acomodar o texto "Not Working" sem quebrar linha
  },
  badgeWorking: {
    backgroundColor: "#008744", // Verde escuro para ativo
  },
  badgeNotWorking: {
    backgroundColor: "#6B7280", // Cinza escuro/Neutro para inativo
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  dotWorking: {
    backgroundColor: "#00FF66", // Verde neon piscante
  },
  dotNotWorking: {
    backgroundColor: "#E5E7EB", // Ponto claro indicador de offline
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});