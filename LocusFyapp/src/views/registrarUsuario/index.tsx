import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, User, Mail, Briefcase, DollarSign, Shield } from "lucide-react-native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import FooterComponent from "@/components/footer";

const RegisterUserView = () => {
    const navigation = useNavigation<any>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateUser = () => {
        console.log({ name, email, role, hourlyRate, password });
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
                <Text style={styles.descriptionText}>
                    Fill in the details below to register a new collaborator into the system.
                </Text>
            </View>

            <ScrollView 
                style={styles.formScrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.inputWrapper}>
                    <User size={20} color="#666666" style={styles.inputIcon} />
                    <View style={styles.inputFlex}>
                        <InputComponent
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Mail size={20} color="#666666" style={styles.inputIcon} />
                    <View style={styles.inputFlex}>
                        <InputComponent
                            placeholder="Corporate Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Briefcase size={20} color="#666666" style={styles.inputIcon} />
                    <View style={styles.inputFlex}>
                        <InputComponent
                            placeholder="Role / Position"
                            value={role}
                            onChangeText={setRole}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <DollarSign size={20} color="#666666" style={styles.inputIcon} />
                    <View style={styles.inputFlex}>
                        <InputComponent
                            placeholder="Hourly Rate (e.g. 25.00)"
                            keyboardType="numeric"
                            value={hourlyRate}
                            onChangeText={setHourlyRate}
                        />
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Shield size={20} color="#666666" style={styles.inputIcon} />
                    <View style={styles.inputFlex}>
                        <InputComponent
                            placeholder="Temporary Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonComponent
                        title="Register Employee"
                        onPress={handleCreateUser}
                    />
                </View>
            </ScrollView>

            <FooterComponent tipoPerfil="funcionario" />
        </View>
    );
};

export default RegisterUserView;