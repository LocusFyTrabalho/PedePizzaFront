import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

// 1. Defina a interface (ou tipo) das props
interface CustomModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

// 2. Aplique a interface ao componente
export const CustomModal: React.FC<CustomModalProps> = ({ 
  visible, 
  title, 
  children, 
  onClose 
}) => {
    return (
        <Modal 
          visible={visible} 
          transparent={true} 
          animationType="fade" 
          onRequestClose={onClose}
        >
            <TouchableOpacity 
              style={styles.overlay} 
              activeOpacity={1} 
              onPress={onClose}
            >
                <View style={styles.container} onStartShouldSetResponder={() => true}>
                    <Text style={styles.title}>{title}</Text>
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};