import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";




const LoginView = () => {


    const navigation = useNavigation<any>();

    const handleLogin = () => {


        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.emptyContainer}>

                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../../assets/PedePizzaLogo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title}>ESTÁ COM FOME?</Text>
                <Text style={styles.title}>PEDE UMA PIZZA AÍ</Text>

            </View>

            <View style={styles.emptyContainer}>
                <InputComponent

                    placeholder="E-mail"
                />

                <InputComponent

                    placeholder="Senha"
                    secureTextEntry={true}
                />
                <ButtonComponent title="Entrar" onPress={() => navigation.navigate('Home')} />
                <View style={styles.emptyContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate('Cadastrese')} style={{ flexDirection: "row" }}> <Text style={styles.subtitle}>Não tem conta? </Text><Text style={[styles.subtitle, { color: "red" }]}>Cadastre-se</Text> </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}> <Text style={[styles.subtitle, { color: "red" }]}>Esqueci minha senha!</Text> </TouchableOpacity>


                </View>
            </View>


        </View>
    );
};



export default LoginView;