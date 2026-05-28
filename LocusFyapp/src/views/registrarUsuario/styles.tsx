import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 32,
    marginBottom: 20,
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
  descriptionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  formScrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
    marginBottom: 4,
  },
  inputFlex: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 24,
    width: "100%",
  },
});