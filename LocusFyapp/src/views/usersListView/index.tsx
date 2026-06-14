import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import { UserContext, UnifiedUserEmployee } from "@/context/UserContext";
import { styles } from "./styles";
import FooterComponent from "@/components/footer";
import InputComponent from "@/components/input"; // 🛠️ Seu componente customizado importado aqui
import { MaterialIcons } from "@expo/vector-icons";

export default function UsersListView() {
  const { users, deleteUser, updateUser } = useContext(UserContext);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UnifiedUserEmployee | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSalary, setEditSalary] = useState("");

  const handleDelete = (id: string, name: string) => {
    Alert.alert("Remover Registro", `Excluir permanentemente ${name}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => deleteUser(id) },
    ]);
  };

  const openEditModal = (user: UnifiedUserEmployee) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditSalary(user.salary);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (selectedUser) {
      await updateUser(selectedUser.id, { name: editName, email: editEmail, salary: editSalary });
      setIsEditModalVisible(false);
      setSelectedUser(null);
      Alert.alert("Sucesso", "Dados atualizados!");
    }
  };

  const renderUserItem = ({ item }: { item: UnifiedUserEmployee }) => {
    return (
      <View style={[styles.card, { paddingVertical: 12, paddingHorizontal: 16, marginBottom: 10 }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <Text style={{ fontSize: 16, fontWeight: "800", color: "#1A1A1A" }}>{item.name}</Text>
          
          <View style={{ flexDirection: "row", gap: 14 }}>
            <TouchableOpacity onPress={() => openEditModal(item)}>
              <MaterialIcons name="edit" size={18} color="#FFA500" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
              <MaterialIcons name="delete" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={{ fontSize: 13, color: "#555" }}>📧 {item.email} | 👤 {item.login}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: "#00873A" }}>R$ {item.salary}</Text>
          <Text style={{ fontSize: 11, fontWeight: "bold", color: "#1D4ED8", backgroundColor: "#EFF6FF", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
            {item.role.replace("ROLE_", "")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>LocusFy</Text>
        <Text style={styles.sloganText}>Controle de Usuários</Text>
      </View>

      {users.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#666" }}>Nenhum usuário ou funcionário salvo localmente.</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 8, paddingTop: 10 }]}
          style={styles.formScrollView}
        />
      )}

      {/* MODAL DE EDIÇÃO */}
      <Modal visible={isEditModalVisible} animationType="fade" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)", padding: 20 }}>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>Modificar Cadastro</Text>
            
            {/* 🛠️ Aplicando o seu InputComponent com margem inferior para espaçamento */}
            <InputComponent 
              placeholder="Nome" 
              value={editName} 
              onChangeText={setEditName} 
              style={{ marginBottom: 12 }} 
            />
            
            <InputComponent 
              placeholder="Email" 
              value={editEmail} 
              onChangeText={setEditEmail} 
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: 12 }} 
            />


            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)} style={{ padding: 12, backgroundColor: "#ccc", borderRadius: 6, width: "48%", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveEdit} style={{ padding: 12, backgroundColor: "#1A1A1A", borderRadius: 6, width: "48%", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FooterComponent/>
    </View>
  );
}