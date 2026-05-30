import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, PanResponder, ImageBackground, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Clock, Play, Pause, ChevronRight, ChevronLeft } from "lucide-react-native";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";
import FooterComponentTemp from "@/components/footertemp/footer";

const HomeView = () => {
    const navigation = useNavigation<any>();
    
    const [working, setWorking] = useState(true);
    const [seconds, setSeconds] = useState(25969); 
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<"in" | "out" | null>(null);

    const buttonWidth = 280;
    const handleSize = 56;
    const swipeRange = buttonWidth - handleSize - 8;
    

    const pan = useRef(new Animated.Value(working ? swipeRange : 0)).current;

    useEffect(() => {
        let interval: any;
        if (working) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [working]);

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleConfirmAction = () => {
        if (pendingAction === "in") {
            setWorking(true);
            Animated.spring(pan, { toValue: swipeRange, useNativeDriver: true }).start();
        } else if (pendingAction === "out") {
            setWorking(false);
            Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
        }
        setShowConfirmModal(false);
        setTimeout(()=>{setPendingAction(null)}, 350)
    };

    const handleCancelAction = () => {
        // Devolve o slider para sua posição de origem original
        Animated.spring(pan, {
            toValue: working ? swipeRange : 0,
            useNativeDriver: true,
        }).start();
        setShowConfirmModal(false);
        setTimeout(()=>{setPendingAction(null)}, 350)
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (!working) {
                    // Puxar para a direita (Entrar no serviço)
                    if (gestureState.dx >= 0 && gestureState.dx <= swipeRange) {
                        pan.setValue(gestureState.dx);
                    }
                } else {
                    // Puxar para a esquerda (Sair do serviço)
                    const newX = swipeRange + gestureState.dx;
                    if (newX >= 0 && newX <= swipeRange) {
                        pan.setValue(newX);
                    }
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (!working) {
                    // Lógica para confirmar entrada (Slide para a direita)
                    if (gestureState.dx >= swipeRange * 0.6) {
                        setPendingAction("in");
                        setShowConfirmModal(true);
                    } else {
                        Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
                    }
                } else {
                    // Lógica para confirmar saída (Slide para a esquerda)
                    const endPosition = swipeRange + gestureState.dx;
                    if (endPosition <= swipeRange * 0.4) {
                        setPendingAction("out");
                        setShowConfirmModal(true);
                    } else {
                        Animated.spring(pan, { toValue: swipeRange, useNativeDriver: true }).start();
                    }
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.greetingText}>Good Morning, John</Text>
                <Text style={styles.statusLabelText}>
                    {working ? "Working for" : "Off Duty"}
                </Text>
                <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                
                <View style={styles.dateRow}>
                    <Text style={styles.dateText}>Monday</Text>
                    <Text style={[styles.dateText, { marginLeft: 16 }]}>March 8</Text>
                </View>

                <View style={styles.indicatorRow}>
                    <View style={[styles.statusDot, working ? styles.dotWorking : styles.dotOff]} />
                    <Text style={styles.indicatorText}>
                        {working ? "Working" : "Not Working"}
                    </Text>
                </View>
            </View>

            <View style={styles.mapContainer}>
                


                    {/* Container do Slider Centralizado */}
                    <View style={styles.swipeContainer}>
                        <View style={[styles.swipeTrack, { backgroundColor: working ? "#FEE2E2" : "#D1FAE5" }]}>
                            <Animated.View
                                {...panResponder.panHandlers}
                                style={[
                                    styles.swipeHandle,
                                    { transform: [{ translateX: pan }] },
                                    { backgroundColor: working ? "#EF4444" : "#10B981" }
                                ]}
                            >
                                {working ? (
                                    <ChevronLeft size={28} color="#FFFFFF" />
                                ) : (
                                    <ChevronRight size={28} color="#FFFFFF" />
                                )}
                            </Animated.View>
                            <Text style={[styles.swipeText, { color: working ? "#991B1B" : "#065F46" }]}>
                                {working ? "Slide Left to Clock Out" : "Slide Right to Clock In"}
                            </Text>
                        </View>
                    </View>
                
            </View>

            {}
            <Modal
                transparent={true}
                visible={showConfirmModal}
                animationType="fade"
                onRequestClose={handleCancelAction}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Action</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to {pendingAction === "in" ? "Clock In" : "Clock Out"}?
                        </Text>
                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancelAction}>
                                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButtonConfirm, { backgroundColor: pendingAction === "in" ? "#10B981" : "#EF4444" }]} 
                                onPress={handleConfirmAction}
                            >
                                <Text style={styles.modalButtonTextConfirm}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <FooterComponent tipoPerfil="funcionario" />
            <FooterComponentTemp tipoPerfil="temp" />

        </View>
    );
};

export default HomeView;