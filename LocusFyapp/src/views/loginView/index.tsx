import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";

const LoginView = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logoText}>LocusFy</Text>
                <Text style={styles.sloganText}>Smart time tracking{"\n"}with location</Text>
            </View>

            <View style={styles.formContainer}>
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