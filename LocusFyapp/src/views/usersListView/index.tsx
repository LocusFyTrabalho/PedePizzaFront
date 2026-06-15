import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { UserContext, UnifiedUserEmployee } from "@/context/UserContext";
import { CustomModal } from "@/components/CustomModal";
import FooterComponent from "@/components/footer";
import InputComponent from "@/components/input";
import ButtonComponent from "@/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function UsersListView() {
  const { users, deleteUser, updateUser } = useContext(UserContext);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<UnifiedUserEmployee | null>(null);
  
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editHourlyRate, setEditHourlyRate] = useState("");
  const [editLogin, setEditLogin] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState<"ROLE_EMPLOYEE" | "ROLE_HR">("ROLE_EMPLOYEE");

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const openDeleteModal = (user: UnifiedUserEmployee) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      setIsDeleteModalVisible(false);
      setSelectedUser(null);
      setSuccessMessage("Record permanently deleted!");
      setIsSuccessModalVisible(true);
    }
  };

  const openEditModal = (user: UnifiedUserEmployee) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditHourlyRate(user.hourlyRate || "");
    setEditLogin(user.login || "");
    setEditPassword("");
    setEditRole((user.role as "ROLE_EMPLOYEE" | "ROLE_HR") || "ROLE_EMPLOYEE");
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (selectedUser) {
      if (!editName || !editEmail || !editHourlyRate || !editLogin) {
        setErrorTitle("Error");
        setErrorMessage("Please fill in all required fields.");
        setIsErrorModalVisible(true);
        return;
      }

      if (!validateEmail(editEmail)) {
        setErrorTitle("Error");
        setErrorMessage("Please enter a valid email address.");
        setIsErrorModalVisible(true);
        return;
      }

      if (editPassword.trim().length > 0 && editPassword.trim().length < 6) {
        setErrorTitle("Error");
        setErrorMessage("Password must be at least 6 characters long.");
        setIsErrorModalVisible(true);
        return;
      }

      const updatePayload: any = {
        name: editName,
        email: editEmail,
        hourlyRate: editHourlyRate,
        login: editLogin,
        role: editRole
      };

      if (editPassword.trim().length > 0) {
        updatePayload.password = editPassword;
      }

      await updateUser(selectedUser.id, updatePayload);
      setIsEditModalVisible(false);
      setSelectedUser(null);
      setSuccessMessage("Data successfully updated!");
      setIsSuccessModalVisible(true);
    }
  };

  const renderUserItem = ({ item }: { item: UnifiedUserEmployee }) => {
    return (
      <View style={styles.cardItemBody}>
        <View style={styles.cardHeaderLayout}>
          <Text style={styles.cardMainTitle}>{item.name}</Text>
          <View style={styles.actionIconsGroup}>
            <TouchableOpacity onPress={() => openEditModal(item)}>
              <MaterialIcons name="edit" size={18} color="#FFA500" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openDeleteModal(item)}>
              <MaterialIcons name="delete" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.cardSubDetails}>📧 {item.email} | 👤 {item.login}</Text>
        
        <View style={styles.cardFooterLayout}>
          <Text style={styles.cardSalaryValue}>$ {item.hourlyRate}/h</Text>
          <Text style={styles.roleBadgeLabel}>
            {item.role.replace("ROLE_", "")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBarActions}>
        <Text style={styles.logoTextText}>Users List</Text>
      </View>
      <Text style={styles.userNameText}>Management Control</Text>

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyStateText}>No users or employees found locally.</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 24, paddingTop: 20 }]}
          style={styles.formScrollView}
          showsVerticalScrollIndicator={false}
        />
      )}

      <CustomModal
        visible={isEditModalVisible}
        title="Modify Registration"
        onClose={() => setIsEditModalVisible(false)}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#1D4ED8", marginBottom: 6, textTransform: "uppercase" }}>Employee Data</Text>
          <InputComponent
            placeholder="Name"
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

          <InputComponent
            placeholder="Hourly Rate ($/h)"
            value={editHourlyRate}
            onChangeText={setEditHourlyRate}
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />

          <Text style={{ fontSize: 12, fontWeight: "700", color: "#1D4ED8", marginBottom: 6, textTransform: "uppercase" }}>User Account</Text>
          <InputComponent
            placeholder="Login / Username"
            value={editLogin}
            onChangeText={setEditLogin}
            autoCapitalize="none"
            style={{ marginBottom: 12 }}
          />

          <InputComponent
            placeholder="New Password (Leave blank to keep current)"
            value={editPassword}
            onChangeText={setEditPassword}
            secureTextEntry
            autoCapitalize="none"
            style={{ marginBottom: 16 }}
          />


          <View style={styles.modalActionsWrapper}>
            <ButtonComponent
              title="Exit"
              onPress={() => setIsEditModalVisible(false)}
              style={styles.btnModalExit}
            />
            <ButtonComponent
              title="Save"
              onPress={handleSaveEdit}
              style={styles.btnModalSave}
            />
          </View>
        </ScrollView>
      </CustomModal>

      <CustomModal
        visible={isDeleteModalVisible}
        title="Remove Record"
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <Text style={{ fontSize: 15, color: "#4B5563", marginBottom: 20, textAlign: "center" }}>
          Permanently delete {selectedUser?.name}?
        </Text>
        <View style={styles.modalActionsWrapper}>
          <ButtonComponent
            title="Cancel"
            onPress={() => setIsDeleteModalVisible(false)}
            style={styles.btnModalExit}
          />
          <ButtonComponent
            title="Delete"
            onPress={handleConfirmDelete}
            style={{ flex: 1, backgroundColor: "#EF4444" }}
          />
        </View>
      </CustomModal>

      <CustomModal
        visible={isErrorModalVisible}
        title={errorTitle}
        onClose={() => setIsErrorModalVisible(false)}
      >
        <Text style={{ fontSize: 15, color: "#4B5563", marginBottom: 20, textAlign: "center" }}>
          {errorMessage}
        </Text>
        <ButtonComponent
          title="Ok"
          onPress={() => setIsErrorModalVisible(false)}
          style={{ backgroundColor: "#1A1A1A", width: "100%" }}
        />
      </CustomModal>

      <CustomModal
        visible={isSuccessModalVisible}
        title="Success"
        onClose={() => setIsSuccessModalVisible(false)}
      >
        <Text style={{ fontSize: 15, color: "#4B5563", marginBottom: 20, textAlign: "center" }}>
          {successMessage}
        </Text>
        <ButtonComponent
          title="Dismiss"
          onPress={() => setIsSuccessModalVisible(false)}
          style={{ backgroundColor: "#1A1A1A", width: "100%" }}
        />
      </CustomModal>

      <FooterComponent />
    </View>
  );
}