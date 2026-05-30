import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#aaa",
    textAlign: "center",
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
    gap: 10,
    backgroundColor: "#ffffff",
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  perfilContainer: {
    marginBottom: 30,
    elevation: 5, //pobroid
    shadowColor: '#000', //IOS
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  fotodeperfil: {
    width: 130,
    height: 130,
    borderRadius: 65, //parece que metade pra ficar bonito, n testei
    // KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
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
    marginTop: 12,
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    color: '#888888',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoBox: {
    backgroundColor: '#FAFAFA',
    color: '#333333',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
});
