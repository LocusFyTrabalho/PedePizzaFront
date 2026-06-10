import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, Pressable, StyleSheet, TouchableOpacity } from "react-native"; // TouchableOpacity corrigido
import { Clock } from "lucide-react-native";
import { styles } from "./styles"; 
import FooterComponent from "@/components/footer";
import FooterComponentTemp from "@/components/footertemp/footer";
import { CustomModal } from "@/components/CustomModal";

const HOLD_DURATION = 5000; 

const HomeView = () => {
    const [working, setWorking] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    
    // Cronômetro
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (working) {
            interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [working]);

    const formatTime = (totalSeconds: number): string => {
        const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
        const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
        const secs = (totalSeconds % 60).toString().padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    /**
     * LÓGICA DO BOTÃO COM ANIMAÇÃO
     */
    const progress = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
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
        // Se soltar antes de 5s, para a animação e reseta
        progress.stopAnimation();
        Animated.timing(progress, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleConfirmAction = () => {
        setWorking(!working);
        setShowConfirmModal(false);
        progress.setValue(0); // Reseta a barra ao confirmar
    };

    const handleCancelAction = () => {
        setShowConfirmModal(false);
        progress.setValue(0); // Reseta a barra ao cancelar
    };

    const widthProgress = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"]
    });

    return (
        <View style={{ flex: 1, backgroundColor: styles.container?.backgroundColor || "#FFFFFF" }}>
            
            <View style={[styles.headerContainer, { zIndex: 10 }]}>
                <Text style={styles.greetingText}>Good Morning, John</Text>
                <Text style={styles.statusLabelText}>{working ? "Working for" : "Off Duty"}</Text>
                <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Pressable 
                    onPressIn={handlePressIn} 
                    onPressOut={handlePressOut}
                    style={[localStyles.holdButtonContainer, { backgroundColor: working ? "#FEE2E2" : "#D1FAE5" }]}
                >
                    <Animated.View style={[localStyles.progressFill, { width: widthProgress, backgroundColor: working ? "#EF4444" : "#10B981" }]} />
                    <View style={localStyles.buttonContent}>
                        <Clock size={24} color={working ? "#991B1B" : "#065F46"} />
                        <Text style={[localStyles.buttonText, { color: working ? "#991B1B" : "#065F46" }]}>
                            {working ? "Hold to Clock Out" : "Hold to Clock In"}
                        </Text>
                    </View>
                </Pressable>
            </View>

            <CustomModal
                visible={showConfirmModal}
                title="Confirmar Ação"
                onClose={handleCancelAction}
            >
                <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>
                    Deseja realmente {working ? "encerrar" : "iniciar"} o seu expediente?
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity style={localStyles.btnCancel} onPress={handleCancelAction}>
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={localStyles.btnConfirm} onPress={handleConfirmAction}>
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            <FooterComponent tipoPerfil="funcionario" />
            <FooterComponentTemp tipoPerfil="temp" />
        </View>
    );
};

const localStyles = StyleSheet.create({
    holdButtonContainer: { width: 280, height: 64, borderRadius: 32, overflow: "hidden", justifyContent: "center", alignItems: "center" },
    progressFill: { position: "absolute", left: 0, top: 0, bottom: 0 },
    buttonContent: { flexDirection: "row", alignItems: "center", gap: 12 },
    buttonText: { fontSize: 16, fontWeight: "700" },
    btnCancel: { flex: 1, padding: 15, backgroundColor: "#EF4444", borderRadius: 10, alignItems: "center" },
    btnConfirm: { flex: 1, padding: 15, backgroundColor: "#10B981", borderRadius: 10, alignItems: "center" }
});

export default HomeView;