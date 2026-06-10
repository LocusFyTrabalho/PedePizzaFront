import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 100,
  },
  perfilContainer: {
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fotodeperfil: {
    width: 130,
    height: 130,
    borderRadius: 65, // Metade exata de 130 para ficar perfeitamente redondo!
    backgroundColor: '#E0E0E0',
  },
  infodadosContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
    marginBottom: 6,
  },
});