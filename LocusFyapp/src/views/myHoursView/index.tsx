import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api";

interface PointRecordDTO {
    id: number;
    startTime: string | null;
    endTime: string | null;
    date: string;
    employeeId: number;
}

interface EmployeeDTO {
    id: number;
    name: string;
    email: string;
    salary: number;
    workedHours: string | null; 
}

function parseDurationToHours(iso: string | null): number {
    if (!iso) return 0;
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = match?.[1] ? parseInt(match[1]) : 0;
    const minutes = match?.[2] ? parseInt(match[2]) : 0;
    return hours + minutes / 60;
}


function calcRecordHours(startTime: string | null, endTime: string | null): number {
    if (!startTime || !endTime) return 0;
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    return (eh + em / 60) - (sh + sm / 60);
}

const MyHoursView = () => {
    const { user } = useContext(AuthContext);

    const [records, setRecords] = useState<PointRecordDTO[]>([]);
    const [employee, setEmployee] = useState<EmployeeDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
        console.log("EMPLOYEE:", JSON.stringify(employee));
        console.log("RECORDS:", JSON.stringify(records));
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [employeeRes, recordsRes] = await Promise.all([
                api.get('/employee/me'),
                api.get('/point/me'),
            ]);
            setEmployee(employeeRes.data);
            setRecords(recordsRes.data);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const totalHours = parseDurationToHours(employee?.workedHours ?? null);
    const estimatedPay = employee ? (employee.salary * totalHours).toFixed(2) : "0.00";

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBarActions}>
                <Text style={styles.logoTextText}>My Hours</Text>
            </View>

            <Text style={styles.userNameText}>{employee?.name ?? "Employee"}</Text>

            <View style={styles.weekSelectorContainer}>
                <TouchableOpacity style={styles.arrowButton}>
                    <ChevronLeft size={20} color="#1A1A1A" />
                </TouchableOpacity>

                <Text style={styles.weekText}>History</Text>

                <TouchableOpacity style={styles.arrowButton}>
                    <ChevronRight size={20} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryBlock}>
                    <Text style={styles.summaryLabel}>Total Hours</Text>
                    <Text style={styles.summaryValue}>{totalHours.toFixed(2)}h</Text>
                </View>

                <View style={styles.summaryBlock}>
                    <Text style={styles.summaryLabel}>Estimated pay</Text>
                    <Text style={styles.summaryValue}>$ {estimatedPay}</Text>
                </View>
            </View>

            <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {records.length === 0 ? (
                    <Text style={{ textAlign: "center", color: "#6B7280", marginTop: 20 }}>
                        No records found.
                    </Text>
                ) : (
                    records.map((item) => {
                        const duration = calcRecordHours(item.startTime, item.endTime);
                        return (
                            <View key={item.id} style={styles.card}>
                                <Text style={styles.cardDateText}>{item.date}</Text>

                                <View style={styles.cardInfoRow}>
                                    <Clock size={20} color="#1A1A1A" style={styles.cardIcon} />
                                    <Text style={styles.cardMainText}>
                                        {item.startTime ?? "--:--"} → {item.endTime ?? "In progress"}
                                    </Text>
                                </View>

                                {item.endTime && (
                                    <Text style={styles.cardSubText}>
                                        {duration.toFixed(2)}h worked
                                    </Text>
                                )}
                            </View>
                        );
                    })
                )}
            </ScrollView>

            <FooterComponent />
        </View>
    );
};

export default MyHoursView;