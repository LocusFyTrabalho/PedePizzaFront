import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f4f4f5" },
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
    backgroundColor: "#f7f7f7",
  },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#18181b", 
    },
    subtitle: {
        fontSize: 16,
        color: "#71717a", 
        
    },
    button: {
        backgroundColor: "#2563eb", 
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 8, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
    },
    buttonText: {
        color: "#ffffff", 
        fontSize: 16,
        fontWeight: "600", 
    },
});