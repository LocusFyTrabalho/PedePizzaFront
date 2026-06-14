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

  locationButton: {
    backgroundColor: "#1D4ED8", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  locationButtonText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 14,
  },
  formScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100, // Espaço extra para o Footer de teste não cobrir o último card
  },
  employeeCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 6,
  },
  fieldLabel: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 8, // Espaço entre os inputs
  },
});