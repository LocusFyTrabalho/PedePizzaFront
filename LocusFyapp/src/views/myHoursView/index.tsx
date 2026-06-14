import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TimeRecord {
    id: number;
    date: string;
    hour: string;
    street: string;
    status: string;
}

const MyHoursView = () => {
    const [records, setRecords] = useState<TimeRecord[]>([]);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        const storage = await AsyncStorage.getItem("timeRecords");
        if (storage) {
            setRecords(JSON.parse(storage));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBarActions}>
                <Text style={styles.logoTextText}>My Hours</Text>
            </View>

            <Text style={styles.userNameText}>John Rodrigues</Text>

            <View style={styles.weekSelectorContainer}>
                <TouchableOpacity style={styles.arrowButton}>
                    <ChevronLeft size={20} color="#1A1A1A" />
                </TouchableOpacity>

                <Text style={styles.weekText}>Week 1</Text>

                <TouchableOpacity style={styles.arrowButton}>
                    <ChevronRight size={20} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryBlock}>
                    <Text style={styles.summaryLabel}>Total Entries</Text>
                    <Text style={styles.summaryValue}>{records.length}</Text>
                </View>

                <View style={styles.summaryBlock}>
                    <Text style={styles.summaryLabel}>Estimated pay</Text>
                    <Text style={styles.summaryValue}>$ 300.80</Text>
                </View>
            </View>

            <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {records.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.cardDateText}>
                            {item.date}
                        </Text>

                        <View style={styles.cardInfoRow}>
                            <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                            <Text style={styles.cardMainText}>
                                {item.hour}
                            </Text>
                        </View>

                        <View style={styles.cardInfoRow}>
                            <MapPin size={20} color="#1A1A1A" style={styles.cardIcon} />
                            <Text style={styles.cardSubText}>
                                {item.street}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.statusBadge,
                                item.status === "Paid"
                                    ? styles.badgePaid
                                    : styles.badgeUnpaid,
                            ]}
                        >
                            <View
                                style={[
                                    styles.badgeDot,
                                    item.status === "Paid"
                                        ? styles.dotPaid
                                        : styles.dotUnpaid,
                                ]}
                            />

                            <Text style={styles.badgeText}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <FooterComponent />
        </View>
    );
};

export default MyHoursView;