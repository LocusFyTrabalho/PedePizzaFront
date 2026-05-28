import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, 
    shadowRadius: 6,
    elevation: 8,
  },
  input: {
    width: "100%",
    fontSize: 18,
    color: "#000000",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  required: {
    width: 10,
    height: 10,
    backgroundColor: "#ed4f0b",
    borderRadius: 10,
    marginLeft: 8,
  },
  textStyle: {
    fontSize: 20,
  },
});