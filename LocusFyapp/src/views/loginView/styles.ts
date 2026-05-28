import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  sloganText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 28,
  },
  formContainer: {
    width: "100%",
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  signUpText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8", // Azul igual ao do botão "Log In"
  },
});