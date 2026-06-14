import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { AuthContext } from "@/context/AuthContext";

const LoginView = () => {
    const { login } = useContext(AuthContext);

    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!loginInput || !password) {
            Alert.alert("Erro", "Preencha login e senha.");
            return;
        }

        setLoading(true);
        try {
            await login(loginInput, password);
            // Não precisa navegar manualmente.
            // O AppNavigator troca pra área privada quando isAuthenticated vira true.
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            Alert.alert("Erro", "Login ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logoText}>LocusFy</Text>
                <Text style={styles.sloganText}>Smart time tracking{"\n"}with location</Text>
            </View>

            <View style={styles.formContainer}>
                <InputComponent
                    placeholder="Login"
                    autoCapitalize="none"
                    value={loginInput}
                    onChangeText={setLoginInput}
                />

                <InputComponent
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <ButtonComponent
                    title={loading ? "Entrando..." : "Log In"}
                    onPress={handleLogin}
                    disabled={loading}
                />

                {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={styles.footerLinkButton}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot my password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginView;