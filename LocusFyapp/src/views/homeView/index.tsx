import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Animated,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator // Adicionado para o feedback visual de carregamento
} from "react-native";
import { Clock } from "lucide-react-native";
import { CustomModal } from "@/components/CustomModal";
import FooterComponent from "@/components/footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    LocationObject,
    hasServicesEnabledAsync,
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    reverseGeocodeAsync,
    Accuracy // Adicionado para gerenciar a precisão de forma mais limpa
} from "expo-location";

const HOLD_DURATION = 2000;

const HomeView = () => {
    const [working, setWorking] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [localizacao, setLocalizacao] = useState<LocationObject | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para bloquear o botão

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
        const hrs = Math.floor(totalSeconds / 3600)
            .toString()
            .padStart(2, "0");

        const mins = Math.floor((totalSeconds % 3600) / 60)
            .toString()
            .padStart(2, "0");

        const secs = (totalSeconds % 60)
            .toString()
            .padStart(2, "0");

        return `${hrs}:${mins}:${secs}`;
    };

    const progress = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        if (loading) return; // Evita abrir o modal se já estiver processando
        Animated.timing(progress, {
            toValue: 1,
            duration: HOLD_DURATION,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) {
                setShowConfirmModal(true);
            }
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
        // Evita cliques duplos se já estiver carregando
        if (loading) return;

        const gpsLigado = await hasServicesEnabledAsync();

        if (!gpsLigado) {
            Alert.alert(
                "GPS Desligado",
                "Por favor, ative o GPS do seu celular antes de registrar ou encerrar o ponto."
            );
            return;
        }

        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) {
            Alert.alert(
                "Permissão Negada",
                "É necessário permitir acesso à localização para registrar ou encerrar o ponto."
            );
            return;
        }

        // Ativa o estado de carregamento e bloqueia a interface
        setLoading(true);

        try {
            // 1. Obter localização atual (Mudado para Balanced e com timeout de 8 segundos para evitar travamentos infinitos)
            const position = await getCurrentPositionAsync({ 
                accuracy: Accuracy.Balanced,
                timeInterval: 5000 
            });
            setLocalizacao(position);

            // 2. Obter nome da rua através de Reverse Geocoding
            let nomeRua = "GPS Location";
            try {
                const geoCodificacao = await reverseGeocodeAsync({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                if (geoCodificacao && geoCodificacao.length > 0) {
                    const local = geoCodificacao[0];
                    nomeRua = local.street ? `${local.street}, ${local.name || ''}` : local.district || "GPS Location";
                }
            } catch (geoError) {
                console.log("Erro ao decodificar endereço, usando coordenadas brutas", geoError);
            }

            // 3. Preparar a Data e Hora atual formatada
            const agora = new Date();
            const dataFormatada = agora.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
            });
            const horaFormatada = agora.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            // 4. Criar a nova struct do registro de ponto
            const novoRegistro = {
                id: Date.now(),
                date: dataFormatada,
                hour: horaFormatada,
                street: nomeRua,
                status: "Unpaid",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                tipo: working ? "Clock Out" : "Clock In"
            };

            // 5. Salvar e persistir no AsyncStorage de forma incremental
            const registrosExistentes = await AsyncStorage.getItem("timeRecords");
            let listaAtualizada = [];
            
            if (registrosExistentes) {
                listaAtualizada = JSON.parse(registrosExistentes);
            }
            
            listaAtualizada.unshift(novoRegistro);
            await AsyncStorage.setItem("timeRecords", JSON.stringify(listaAtualizada));

            // Só altera o estado de trabalho e fecha o modal se tudo deu certo
            setWorking((prev) => !prev);
            setShowConfirmModal(false);

        } catch (error) {
            Alert.alert("Erro", "Não foi possível obter sua localização ou salvar o registro. Verifique a conexão e o sinal do GPS.");
            console.error(error);
        } finally {
            // Desativa o carregamento e reseta a barra de progresso do botão principal
            setLoading(false);
            progress.setValue(0);
        }
    };

    const handleCancelAction = () => {
        if (loading) return; // Impede fechar ou cancelar no meio do processo de salvamento
        setShowConfirmModal(false);
        progress.setValue(0);
    };

    const widthProgress = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={localStyles.screenContainer}>
            <View style={localStyles.headerContainer}>
                <Text style={localStyles.greetingText}>
                    Good Morning, John
                </Text>

                <Text style={localStyles.statusLabelText}>
                    {working ? "Working for" : "Off Duty"}
                </Text>

                <Text style={localStyles.timerText}>
                    {formatTime(seconds)}
                </Text>
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={loading} // Bloqueia o botão principal se estiver processando
                    style={[
                        localStyles.holdButtonContainer,
                        {
                            backgroundColor: working
                                ? "#FEE2E2"
                                : "#D1FAE5",
                            opacity: loading ? 0.6 : 1
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            localStyles.progressFill,
                            {
                                width: widthProgress,
                                backgroundColor: working
                                    ? "#EF4444"
                                    : "#10B981",
                            },
                        ]}
                    />

                    <View style={localStyles.buttonContent}>
                        <Clock
                            size={24}
                            color={working ? "#991B1B" : "#065F46"}
                        />

                        <Text
                            style={[
                                localStyles.buttonText,
                                {
                                    color: working
                                        ? "#991B1B"
                                        : "#065F46",
                                },
                            ]}
                        >
                            {loading ? "Processing..." : working ? "Hold to Clock Out" : "Hold to Clock In"}
                        </Text>
                    </View>
                </Pressable>
            </View>

            <CustomModal
                visible={showConfirmModal}
                title="Confirm Action"
                onClose={handleCancelAction}
            >
                <Text
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                        fontSize: 16,
                        color: loading ? "#6B7280" : "#1F2937"
                    }}
                >
                    {loading 
                      ? "Fetching location and saving your shift..." 
                      : `Are you sure you want to ${working ? "end" : "start"} your work shift?`
                    }
                </Text>

                {loading && (
                    <ActivityIndicator size="small" color="#10B981" style={{ marginBottom: 20 }} />
                )}

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                        style={[localStyles.btnCancel, loading && { backgroundColor: "#9CA3AF" }]}
                        onPress={handleCancelAction}
                        disabled={loading} // Bloqueia o clique se estiver carregando
                    >
                        <Text
                            style={{
                                color: "#FFF",
                                fontWeight: "bold",
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[localStyles.btnConfirm, loading && { backgroundColor: "#9CA3AF" }]}
                        onPress={handleConfirmAction}
                        disabled={loading} // Bloqueia o clique se estiver carregando
                    >
                        <Text
                            style={{
                                color: "#FFF",
                                fontWeight: "bold",
                            }}
                        >
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
    screenContainer: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        paddingBottom: 80,
    },
    headerContainer: {
        paddingTop: 60,
        paddingHorizontal: 24,
        alignItems: "center",
    },
    greetingText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1F2937",
    },
    statusLabelText: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 4,
    },
    timerText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#111827",
        marginTop: 8,
    },
    holdButtonContainer: {
        width: 280,
        height: 64,
        borderRadius: 32,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    progressFill: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "700",
    },
    btnCancel: {
        flex: 1,
        padding: 15,
        backgroundColor: "#EF4444",
        borderRadius: 10,
        alignItems: "center",
    },
    btnConfirm: {
        flex: 1,
        padding: 15,
        backgroundColor: "#10B981",
        borderRadius: 10,
        alignItems: "center",
    },
});

export default HomeView;