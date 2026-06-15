import React, { useState, useEffect, useRef, useContext } from "react";
import {
    View,
    Text,
    Animated,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from "react-native";
import { Clock } from "lucide-react-native";
import { CustomModal } from "@/components/CustomModal";
import FooterComponent from "@/components/footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    hasServicesEnabledAsync,
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    Accuracy
} from "expo-location";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api";

const HOLD_DURATION = 2000;

interface PointRecordDTO {
    id: number;
    startTime: string | null;
    endTime: string | null;
    date: string;
    employeeId: number;
    latitude: number | null;
    longitude: number | null;
}

const HomeView = () => {
    const { user } = useContext(AuthContext);

    const [working, setWorking] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [initializing, setInitializing] = useState<boolean>(true);

    // Verifica se já existe um ponto aberto ao carregar a tela
    useEffect(() => {
        checkCurrentStatus();
    }, []);

    const checkCurrentStatus = async () => {
        try {
            const response = await api.get<PointRecordDTO[]>('/point/me');
            const records = response.data;

            // /point/me já vem ordenado por data desc; o primeiro é o mais recente
            const openRecord = records.find((r) => r.endTime === null);

            if (openRecord) {
                setWorking(true);

                if (openRecord.startTime) {
                    const [h, m, s] = openRecord.startTime.split(":").map(Number);
                    const start = new Date();
                    start.setHours(h, m, s || 0, 0);

                    const now = new Date();
                    const diffSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);
                    setSeconds(diffSeconds > 0 ? diffSeconds : 0);
                }
            }
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        } finally {
            setInitializing(false);
        }
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (working) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [working]);

    const formatTime = (totalSeconds: number): string => {
        const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
        const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
        const secs = (totalSeconds % 60).toString().padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    const progress = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        if (loading) return;
        Animated.timing(progress, {
            toValue: 1,
            duration: HOLD_DURATION,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) setShowConfirmModal(true);
        });
    };

    const handlePressOut = () => {
        progress.stopAnimation();
        Animated.timing(progress, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleConfirmAction = async () => {
        if (loading) return;

        const gpsLigado = await hasServicesEnabledAsync();
        if (!gpsLigado) {
            Alert.alert("GPS Desligado", "Por favor, ative o GPS do seu celular antes de registrar ou encerrar o ponto.");
            return;
        }

        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
            Alert.alert("Permissão Negada", "É necessário permitir acesso à localização para registrar ou encerrar o ponto.");
            return;
        }

        if (!user?.employeeId) {
            Alert.alert("Erro", "Não foi possível identificar o funcionário. Faça login novamente.");
            return;
        }

        setLoading(true);

        try {
            const position = await getCurrentPositionAsync({
                accuracy: Accuracy.Balanced,
                timeInterval: 5000,
            });

            if (!working) {
                await api.post('/point', {
                    employeeId: user.employeeId,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            } else {
                await api.put('/point', { employeeId: user.employeeId });
            }

            const agora = new Date();
            const novoRegistro = {
                id: Date.now(),
                date: agora.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
                hour: agora.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
                tipo: working ? "Clock Out" : "Clock In",
            };

            const registrosExistentes = await AsyncStorage.getItem("timeRecords");
            let listaAtualizada = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            listaAtualizada.unshift(novoRegistro);
            await AsyncStorage.setItem("timeRecords", JSON.stringify(listaAtualizada));

            setWorking((prev) => !prev);
            setShowConfirmModal(false);

            if (working) {
                // Acabou de dar Clock Out -> zera o cronômetro
                setSeconds(0);
            }

        } catch (error: any) {
            console.error(error.response?.data || error.message);

            if (error.response?.status === 400 || error.response?.status === 404) {
                Alert.alert("Erro", "Não foi possível registrar o ponto. Verifique se já existe um registro de entrada aberto.");
            } else {
                Alert.alert("Erro", "Não foi possível registrar o ponto. Verifique sua conexão.");
            }
        } finally {
            setLoading(false);
            progress.setValue(0);
        }
    };

    const handleCancelAction = () => {
        if (loading) return;
        setShowConfirmModal(false);
        progress.setValue(0);
    };

    const widthProgress = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    if (initializing) {
        return (
            <View style={[localStyles.screenContainer, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={localStyles.screenContainer}>
            <View style={localStyles.headerContainer}>
                <Text style={localStyles.greetingText}>Good Morning</Text>
                <Text style={localStyles.statusLabelText}>
                    {working ? "Working for" : "Off Duty"}
                </Text>
                <Text style={localStyles.timerText}>{formatTime(seconds)}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={loading}
                    style={[
                        localStyles.holdButtonContainer,
                        {
                            backgroundColor: working ? "#FEE2E2" : "#D1FAE5",
                            opacity: loading ? 0.6 : 1
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            localStyles.progressFill,
                            {
                                width: widthProgress,
                                backgroundColor: working ? "#EF4444" : "#10B981",
                            },
                        ]}
                    />
                    <View style={localStyles.buttonContent}>
                        <Clock size={24} color={working ? "#991B1B" : "#065F46"} />
                        <Text style={[localStyles.buttonText, { color: working ? "#991B1B" : "#065F46" }]}>
                            {loading ? "Processing..." : working ? "Hold to Clock Out" : "Hold to Clock In"}
                        </Text>
                    </View>
                </Pressable>
            </View>

            <CustomModal visible={showConfirmModal} title="Confirm Action" onClose={handleCancelAction}>
                <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16, color: loading ? "#6B7280" : "#1F2937" }}>
                    {loading
                      ? "Saving your record..."
                      : `Are you sure you want to ${working ? "end" : "start"} your work shift?`
                    }
                </Text>

                {loading && <ActivityIndicator size="small" color="#10B981" style={{ marginBottom: 20 }} />}

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity style={[localStyles.btnCancel, loading && { backgroundColor: "#9CA3AF" }]} onPress={handleCancelAction} disabled={loading}>
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[localStyles.btnConfirm, loading && { backgroundColor: "#9CA3AF" }]} onPress={handleConfirmAction} disabled={loading}>
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                            {loading ? "Saving..." : "Confirm"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            <FooterComponent />
        </View>
    );
};

const localStyles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: "#F3F4F6", paddingBottom: 80 },
    headerContainer: { paddingTop: 60, paddingHorizontal: 24, alignItems: "center" },
    greetingText: { fontSize: 20, fontWeight: "bold", color: "#1F2937" },
    statusLabelText: { fontSize: 14, color: "#6B7280", marginTop: 4 },
    timerText: { fontSize: 36, fontWeight: "bold", color: "#111827", marginTop: 8 },
    holdButtonContainer: { width: 280, height: 64, borderRadius: 32, overflow: "hidden", justifyContent: "center", alignItems: "center" },
    progressFill: { position: "absolute", left: 0, top: 0, bottom: 0 },
    buttonContent: { flexDirection: "row", alignItems: "center", gap: 12 },
    buttonText: { fontSize: 16, fontWeight: "700" },
    btnCancel: { flex: 1, padding: 15, backgroundColor: "#EF4444", borderRadius: 10, alignItems: "center" },
    btnConfirm: { flex: 1, padding: 15, backgroundColor: "#10B981", borderRadius: 10, alignItems: "center" },
});

export default HomeView;