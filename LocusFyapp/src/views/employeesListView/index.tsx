import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, ChevronRight, Clock, MapPin, MoreHorizontal } from "lucide-react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";

const EmployeesListView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.logoText}>List of Hired Employees</Text>

                </View>

            </View>


            <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <Text style={styles.cardDateText}>Monday - March 8</Text>

                    <View style={styles.cardInfoRow}>
                        <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardMainText}>07:12</Text>
                    </View>

                    <View style={styles.cardInfoRow}>
                        <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                        <Text style={styles.cardSubText}>Concord Street</Text>
                    </View>

                    <View style={[styles.statusBadge, styles.badgePaid]}>
                        <View style={[styles.badgeDot, styles.dotPaid]} />
                        <Text style={styles.badgeText}>Paid</Text>
                    </View>
                </View>

            </ScrollView>

            <FooterComponent tipoPerfil="funcionario" />
        </View>
    );
};

export default EmployeesListView;