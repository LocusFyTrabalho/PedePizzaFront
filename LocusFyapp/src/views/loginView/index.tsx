import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";
import { AuthContext } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; 
import { PublicStackParamList } from "@/routes/types";

const LoginView = () => {
    const { login } = useContext(AuthContext);

    const navigation = useNavigation<NativeStackNavigationProp<PublicStackParamList>>();

    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!loginInput || !password) {
            Alert.alert("Error", "Please enter both login and password.");
            return;
        }

        setLoading(true);
        try {
            await login(loginInput, password);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            Alert.alert("Error", "Invalid login or password.");
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
                    title={loading ? "Logging in..." : "Log In"}
                    onPress={handleLogin}
                    disabled={loading}
                />

                {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RecuperarSenha")}
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