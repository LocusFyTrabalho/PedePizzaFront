import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  containerDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
  },
  input: {
    width: "100%",
    fontSize: 16,
    color: "#1A1A1A",
  },
  inputDisabled: {
    color: "#888888",
  },
});