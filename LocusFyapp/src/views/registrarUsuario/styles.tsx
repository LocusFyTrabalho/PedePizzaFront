import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
  },
  sloganText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D4ED8",
    textAlign: "center",
    marginTop: 4,
  },
  formScrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  label: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 16,
    width: "100%",
  },
});