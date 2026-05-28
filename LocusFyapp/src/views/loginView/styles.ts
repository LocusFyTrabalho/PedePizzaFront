import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    paddingTop: Platform.OS === "ios" ? 60 : 40, 
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 10,
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
  descriptionText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingBottom: 40,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  signUpText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
    marginTop: 8,
  },
  backToLoginText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
  },
});