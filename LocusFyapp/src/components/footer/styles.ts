import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
    position: "absolute", // Fixa o componente na tela
    bottom: 0,            // Cola ele na borda inferior
    left: 0,              // Estica até a borda esquerda
    right: 0,             // Estica até a borda direita
    flexDirection: "row",
    backgroundColor: "#032AD7",
    height: 70,
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