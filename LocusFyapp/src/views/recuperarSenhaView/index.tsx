import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";

const RecuperarSenhaView = () => {
    const navigation = useNavigation<any>();

    const handleRecoverPassword = () => {
        console.log("Recuperar senha solicitado");
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logoText}>LocusFy</Text>
                <Text style={styles.sloganText}>Recover Password</Text>
                <Text style={styles.descriptionText}>
                    Enter your email below to receive password reset instructions.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <InputComponent
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <ButtonComponent
                    title="Send Instructions"
                    onPress={handleRecoverPassword}
                />

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.footerLinkButton}
                    >
                        <Text style={styles.footerText}>Back to </Text>
                        <Text style={styles.backToLoginText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RecuperarSenhaView;