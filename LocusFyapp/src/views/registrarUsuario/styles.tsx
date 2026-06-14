import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    marginTop: 10,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
  },

  sloganText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 4,
    fontWeight: "500",
  },

  sloganTextForm: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D4ED8",
    textAlign: "center",
    marginTop: 4,
  },

  backButton: {
    position: "absolute",
    left: 0,
    padding: 4,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    padding: 4,
  },


  formScrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 220,
  },
  scrollContentForm: {
    paddingTop: 10,
    paddingBottom: 100, 
  },


  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 16, 
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    elevation: 4,
  },
  employeeCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EDEDED"
  },
  employeeName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#666666",
    marginTop: 12,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  label: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 4,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D4ED8",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 4,
  },

  weekSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  arrowButton: {
    borderWidth: 1,
    borderColor: "#1A1A1A",
    borderRadius: 8,
    padding: 4,
    marginHorizontal: 12,
  },
  weekText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  cardsContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 16,
  },
  cardDateText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    gap: 12,
    width: "100%",
  },
  cardIcon: {
    marginRight: 8,
  },
  cardMainText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  cardSubText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 8,
    width: "50%",
  },
  badgePaid: {
    backgroundColor: "#00873A",
  },
  badgeUnpaid: {
    backgroundColor: "#E50000",
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  dotPaid: {
    backgroundColor: "#22C55E",
  },
  dotUnpaid: {
    backgroundColor: "#FCA5A5",
  },
  badgeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },


  buttonContainer: {
    marginTop: 16,
    width: "100%",
  },
  footerSecundario: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    paddingTop: 8,
    paddingBottom: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 15,
    justifyContent: "space-between",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  summaryBlock: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
  },
});