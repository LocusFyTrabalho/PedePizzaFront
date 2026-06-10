import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import FooterComponent from "@/components/footer";
import { CustomModal } from "@/components/CustomModal";

const RegisterUserView = () => {
    const navigation = useNavigation<any>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [password, setPassword] = useState("");
    
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const handleRegisterPress = () => {
        if (!name || !email || !role || !password) {
            setShowErrorModal(true);
            return;
        }
        Keyboard.dismiss();
        setShowConfirmModal(true);
    };

    const handleCancelAction = () => {
        setShowConfirmModal(false);
    };

    const handleConfirmAction = () => {
        setShowConfirmModal(false);
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        navigation.navigate('UsersList'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft size={28} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text style={styles.logoText}>LocusFy</Text>
                </View>
                <Text style={styles.sloganText}>New Employee</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.formScrollView}>
                
                <Text style={styles.label}>Full Name</Text>
                <InputComponent placeholder="Enter full name" value={name} onChangeText={setName} />

                <Text style={styles.label}>Corporate Email</Text>
                <InputComponent placeholder="Enter corporate email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

                <Text style={styles.label}>Role / Position</Text>
                <InputComponent placeholder="Enter role or position" value={role} onChangeText={setRole} />

                <Text style={styles.label}>Hourly Rate</Text>
                <InputComponent placeholder="Enter hourly rate" keyboardType="numeric" value={hourlyRate} onChangeText={setHourlyRate} />

                <Text style={styles.label}>Temporary Password</Text>
                <InputComponent placeholder="Enter temporary password" secureTextEntry={true} value={password} onChangeText={setPassword} />

                <View style={styles.buttonContainer}>
                    <ButtonComponent title="Register Employee" onPress={handleRegisterPress} />
                </View>
            </ScrollView>

            {/* CONFIRMATION MODAL */}
            <CustomModal visible={showConfirmModal} title="Confirm Registration" onClose={handleCancelAction}>
                <Text style={localStyles.modalText}>Are you sure you want to register this employee?</Text>
                <View style={localStyles.modalButtonsRow}>
                    <TouchableOpacity style={localStyles.btnCancel} onPress={handleCancelAction}>
                        <Text style={localStyles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={localStyles.btnConfirm} onPress={handleConfirmAction}>
                        <Text style={localStyles.btnText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            {/* SUCCESS MODAL */}
            <CustomModal visible={showSuccessModal} title="Success!" onClose={handleSuccessClose}>
                <Text style={localStyles.modalText}>Employee registered successfully!</Text>
                <View style={localStyles.modalButtonsRow}>
                    <TouchableOpacity style={localStyles.btnConfirm} onPress={handleSuccessClose}>
                        <Text style={localStyles.btnText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            {/* ERROR MODAL */}
            <CustomModal visible={showErrorModal} title="Attention" onClose={() => setShowErrorModal(false)}>
                <Text style={localStyles.modalText}>Please fill in all required fields.</Text>
                <View style={localStyles.modalButtonsRow}>
                    <TouchableOpacity style={localStyles.btnCancel} onPress={() => setShowErrorModal(false)}>
                        <Text style={localStyles.btnText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            <FooterComponent tipoPerfil="funcionario" />
        </View>
    );
};

const localStyles = StyleSheet.create({
    modalText: { textAlign: "center", marginBottom: 20, fontSize: 16, color: "#666666", fontWeight: "600" },
    modalButtonsRow: { flexDirection: "row", gap: 12, width: "100%" },
    btnCancel: { flex: 1, padding: 15, backgroundColor: "#EF4444", borderRadius: 10, alignItems: "center" },
    btnConfirm: { flex: 1, padding: 15, backgroundColor: "#10B981", borderRadius: 10, alignItems: "center" },
    btnText: { color: "#FFF", fontWeight: "bold", fontSize: 15 }
});

export default RegisterUserView;