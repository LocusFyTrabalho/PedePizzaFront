import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 40
  },
  topBarActions: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16
  },
  logoTextText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center"
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 10
  },
  formScrollView: {
    flex: 1,
  },
  scrollContent: { 
    paddingBottom: 100 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  emptyStateText: { 
    color: "#666",
    fontSize: 15 
  },
  cardItemBody: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    marginBottom: 12
  },
  cardHeaderLayout: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 6 
  },
  cardMainTitle: { 
    fontSize: 16, 
    fontWeight: "800", 
    color: "#1A1A1A" 
  },
  actionIconsGroup: { 
    flexDirection: "row", 
    gap: 14 
  },
  cardSubDetails: { 
    fontSize: 13, 
    color: "#4B5563" 
  },
  cardFooterLayout: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 8, 
    alignItems: "center" 
  },
  cardSalaryValue: { 
    fontSize: 14, 
    fontWeight: "700", 
    color: "#00873A" 
  },
  roleBadgeLabel: { 
    fontSize: 11, 
    fontWeight: "bold", 
    color: "#1D4ED8", 
    backgroundColor: "#EFF6FF", 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 4 
  },
  modalActionsWrapper: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    gap: 10,
    width: "100%"
  },
  btnModalExit: { 
    flex: 1,
    backgroundColor: "#9CA3AF"
  },
  btnModalSave: { 
    flex: 1,
    backgroundColor: "#1A1A1A"
  },
});