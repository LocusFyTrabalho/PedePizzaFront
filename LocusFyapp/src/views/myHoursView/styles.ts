import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        paddingTop: 40
    },

    topBarActions: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16
    },

    logoTextText: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1A1A1A",
        textAlign: "center"
    },

    userNameText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#6B7280",
        textAlign: "center",
        marginTop: 6
    },

    arrowButton: {
        padding: 8,
        backgroundColor: "#E5E7EB",
        borderRadius: 8
    },

    weekSelectorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        marginTop: 24
    },

    weekText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A"
    },

    summaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        marginTop: 20,
        gap: 12
    },

    summaryBlock: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB"
    },

    summaryLabel: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "600"
    },

    summaryValue: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1A1A1A",
        marginTop: 4
    },

    cardsContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 16
    },

    scrollContent: {
        paddingBottom: 100
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB"
    },

    cardDateText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4B5563",
        marginBottom: 8
    },

    cardInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6
    },

    cardIcon: {
        marginRight: 8
    },

    cardMainText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1A1A1A"
    },

    cardSubText: {
        fontSize: 15,
        color: "#6B7280"
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginTop: 8
    },

    badgePaid: {
        backgroundColor: "#D1FAE5"
    },

    badgeUnpaid: {
        backgroundColor: "#FEE2E2"
    },

    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6
    },

    dotPaid: {
        backgroundColor: "#10B981"
    },

    dotUnpaid: {
        backgroundColor: "#EF4444"
    },

    badgeText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1F2937"
    }
});