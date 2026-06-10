import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  cardTotal: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1E293B",
  },
  rowCards: {
    flexDirection: "row",
    gap: 16,
  },
  cardStatus: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
});