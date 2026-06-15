import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { UserContext } from "@/context/UserContext";
import { CustomModal } from "@/components/CustomModal";
import FooterComponent from "@/components/footer";
import InputComponent from "@/components/input";
import ButtonComponent from "@/components/button";
import { styles } from "./styles";

export default function RegisterUserView({ navigation }: any) {
  const { addUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"EMPLOYEE" | "HR">("EMPLOYEE");

  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleRegister = async () => {
    if (!name || !email || !hourlyRate || !login || !password) {
      setErrorTitle("Error");
      setErrorMessage("Please fill in all the fields in the form.");
      setIsErrorModalVisible(true);
      return;
    }

    if (!validateEmail(email)) {
      setErrorTitle("Error");
      setErrorMessage("Please enter a valid email address.");
      setIsErrorModalVisible(true);
      return;
    }

    if (password.trim().length < 6) {
      setErrorTitle("Error");
      setErrorMessage("Password must be at least 6 characters long.");
      setIsErrorModalVisible(true);
      return;
    }

    try {
      await addUser({ name, email, hourlyRate, login, password, role });
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      console.error(error.response?.data || error.message);

      if (error.response?.status === 403) {
        setErrorTitle("Permission Denied");
        setErrorMessage("You don't have permission to register employees (ADMIN/HR only).");
      } else if (error.response?.status === 400) {
        setErrorTitle("Error");
        setErrorMessage("This login already exists or the data is invalid.");
      } else {
        setErrorTitle("Error");
        setErrorMessage("Could not complete the registration. Check your connection.");
      }
      setIsErrorModalVisible(true);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessModalVisible(false);
    setName(""); setEmail(""); setHourlyRate(""); setLogin(""); setPassword("");
    navigation.navigate("ListaUsuario");
  };

  return (
    <View style={[styles.container, { paddingHorizontal: 24 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>LocusFy</Text>
          <Text style={styles.sloganTextForm}>New Unified Registration</Text>
        </View>

        <Text style={[styles.fieldLabel, { color: "#1D4ED8", marginTop: 20 }]}>Employee Details</Text>
        <InputComponent placeholder="Full Name" value={name} onChangeText={setName} style={inputStyle} />
        <InputComponent placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={inputStyle} />
        <InputComponent placeholder="Hourly Rate ($/h)" value={hourlyRate} onChangeText={setHourlyRate} keyboardType="numeric" style={inputStyle} />

        <Text style={[styles.fieldLabel, { color: "#1D4ED8", marginTop: 20 }]}>User Access</Text>
        <InputComponent placeholder="Login / Username" value={login} onChangeText={setLogin} autoCapitalize="none" style={inputStyle} />
        <InputComponent placeholder="Access Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" style={inputStyle} />

        <Text style={styles.fieldLabel}>Job Level (Role)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25, gap: 8 }}>
          {(["EMPLOYEE", "HR"] as const).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r)}
              style={{
                flex: 1,
                padding: 12,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                backgroundColor: role === r ? "#1A1A1A" : "#fff",
                borderColor: role === r ? "#1A1A1A" : "#ccc"
              }}
            >
              <Text style={{ color: role === r ? "#fff" : "#000", fontSize: 11, fontWeight: "700" }}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ButtonComponent
          title="Save Registration"
          onPress={handleRegister}
          style={{ backgroundColor: "#1A1A1A", padding: 16, marginTop: 10 }}
        />
      </ScrollView>

      <CustomModal visible={isErrorModalVisible} title={errorTitle} onClose={() => setIsErrorModalVisible(false)}>
        <Text style={{ fontSize: 15, color: "#4B5563", marginBottom: 20, textAlign: "center" }}>{errorMessage}</Text>
        <ButtonComponent title="Ok" onPress={() => setIsErrorModalVisible(false)} style={{ backgroundColor: "#1A1A1A", width: "100%" }} />
      </CustomModal>

      <CustomModal visible={isSuccessModalVisible} title="Success" onClose={handleSuccessClose}>
        <Text style={{ fontSize: 15, color: "#4B5563", marginBottom: 20, textAlign: "center" }}>
          Employee and User successfully created!
        </Text>
        <ButtonComponent title="Continue" onPress={handleSuccessClose} style={{ backgroundColor: "#1A1A1A", width: "100%" }} />
      </CustomModal>

      <FooterComponent />
    </View>
  );
}

const inputStyle = {
  marginBottom: 12,
};