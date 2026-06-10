import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { styles } from "./styles";

// Definição das propriedades que o modal pode receber
interface CustomModalProps {
    visible: boolean;               // Controla se o modal está aberto ou fechado
    title: string;                  // Título principal do modal
    onClose: () => void;            // Função executada ao fechar ou cancelar
    children?: React.ReactNode;     // Permite injetar botões ou layouts customizados dentro do modal
}

export const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    title,
    onClose,
    children
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose} // Trata o botão "Voltar" do Android
        >
            {/* Fundo escurecido atrás do modal */}
            <View style={styles.overlay}>
                
                {/* Caixa Branca do Modal */}
                <View style={styles.container}>
                    
                    {/* Título Dinâmico */}
                    <Text style={styles.title}>{title}</Text>
                    
                    {/* Área de conteúdo dinâmico (onde vão entrar seus botões personalizados) */}
                    <View style={styles.content}>
                        {children}
                    </View>
                    
                    {/* Botão de Fechar padrão na parte inferior (igual ao layout da imagem) */}

                    
                </View>
                
            </View>
        </Modal>
    );
};