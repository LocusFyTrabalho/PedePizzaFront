import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal:100,
    paddingVertical:5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden", 
  },
  input: {
    width: "100%",
    fontSize: 16,
    color: "#000000",
    padding: 0,
    margin: 0,
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
