import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
    position: "absolute", 
    bottom: 0,            
    left: 0,              
    right: 0,             
    flexDirection: "row",
    backgroundColor: "#032AD7",
    height: 70,
    paddingTop:18,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
  },
  menuItem: {
    alignItems: "center", 
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 4,
  },
});