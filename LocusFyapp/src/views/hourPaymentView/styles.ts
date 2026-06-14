import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", 
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
    paddingBottom: 120, 
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  dateText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
    fontWeight: "500"
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  icon: {
    color: "#4B5563",
  },
  infoText: {
    fontSize: 14,
    color: "#374151",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  badgePaid: {
    backgroundColor: "#D1FAE5",
  },
  badgeUnpaid: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPaid: {
    backgroundColor: "#10B981",
  },
  dotUnpaid: {
    backgroundColor: "#EF4444",
  },
  mapButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});