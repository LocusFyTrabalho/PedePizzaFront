import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        borderRadius: 32, 
        padding: 24,
        alignItems: "center",
      
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000000",
        marginBottom: 20,
        textAlign: "center",
    },
    content: {
        width: "100%",
        gap: 12, 
        marginBottom: 16,
    },
    closeButton: {
        marginTop: 8,
        paddingVertical: 8,
        width: "100%",
        alignItems: "center",
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000000",
    },
    
});