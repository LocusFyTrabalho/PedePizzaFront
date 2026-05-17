import React from "react";
import { View, Text, } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { NavigationProps } from "@/routes/types";
import ButtonComponent from "@/components/button";
import InputComponent from "@/components/input";




const LoginView = () => {

    const navigation = useNavigation<NavigationProps>();


    const handleLogin = () => {


        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.emptyContainer}>

                <Text style={styles.subtitle}>ESTÁ COM FOME?</Text>
                <Text style={styles.subtitle}>PEDE UMA PIZZA AÍ</Text>

            </View>

            <View style={styles.emptyContainer}>
                <InputComponent
                    
                    placeholder="E-mail"
                />

                <InputComponent
                    
                    placeholder="Senha" 
                    secureTextEntry={true}
                />
                <ButtonComponent title={"Entrar"} onPress={handleLogin} />
            </View>


        </View>
    );
};



export default LoginView;