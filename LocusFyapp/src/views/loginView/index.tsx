import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";

const LoginView = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>

                <View style={styles.headerContainer}>
                    <Text style={styles.logoText}>LocusFy</Text>
                    <Text style={styles.sloganText}> Locate your employees. </Text>
                    <Text style={styles.sloganText}>  </Text>
                    
                </View>

                <InputComponent
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <InputComponent
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <ButtonComponent
                    title="Log In"
                    onPress={() => navigation.navigate('Home')}
                />

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RecuperarSenha')}
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