import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { UserContext } from "@/context/UserContext";
import FooterComponent from "@/components/footer";
import { styles } from "./styles"; 

export default function RegisterUserView({ navigation }: any) {
  const { addUser } = useContext(UserContext);

  // Dados do Funcionário (Backend Entity 1)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  // Dados do Usuário (Backend Entity 2)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ROLE_EMPLOYEE" | "ROLE_HR" | "ROLE_MANAGER">("ROLE_EMPLOYEE");

  const handleRegister = async () => {
    if (!name || !email || !salary || !login || !password) {
      Alert.alert("Erro", "Preencha todos os campos do formulário.");
      return;
    }

    // Envia o objeto plano contendo os dados que seu backend vai separar depois
    await addUser({ name, email, salary, login, password, role });
    
    Alert.alert("Sucesso", "Funcionário e Usuário criados!");
    
    // Reset do form
    setName(""); setEmail(""); setSalary(""); setLogin(""); setPassword("");
    navigation.navigate("ListaUsuario");
  };

  return (
    <View style={[styles.container, { paddingHorizontal: 24 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>LocusFy</Text>
          <Text style={styles.sloganText}>Novo Cadastro Unificado</Text>
        </View>

        {/* --- SEÇÃO: DADOS DO FUNCIONÁRIO --- */}
        <Text style={[styles.fieldLabel, { color: "#1D4ED8", marginTop: 20 }]}>Dados do Funcionário</Text>
        <TextInput placeholder="Nome Completo" value={name} onChangeText={setName} style={inputStyle} />
        <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={inputStyle} />
        <TextInput placeholder="Salário (R$)" value={salary} onChangeText={setSalary} keyboardType="numeric" style={inputStyle} />

        {/* --- SEÇÃO: CREDENCIAIS DE USUÁRIO --- */}
        <Text style={[styles.fieldLabel, { color: "#1D4ED8", marginTop: 20 }]}>Acesso do Usuário</Text>
        <TextInput placeholder="Login / Nome de Usuário" value={login} onChangeText={setLogin} autoCapitalize="none" style={inputStyle} />
        <TextInput placeholder="Senha de Acesso" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" style={inputStyle} />

        <Text style={styles.fieldLabel}>Nível de Cargo (Role)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25, gap: 8 }}>
          {(["ROLE_EMPLOYEE", "ROLE_HR", "ROLE_MANAGER"] as const).map((r) => (
            <TouchableOpacity key={r} onPress={() => setRole(r)} style={{ flex: 1, padding: 10, borderWidth: 1, borderRadius: 8, alignItems: 'center', backgroundColor: role === r ? "#1A1A1A" : "#fff", borderColor: role === r ? "#1A1A1A" : "#ccc" }}>
              <Text style={{ color: role === r ? "#fff" : "#000", fontSize: 11, fontWeight: "700" }}>{r.replace("ROLE_", "")}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: "#1A1A1A", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Salvar Cadastro</Text>
        </TouchableOpacity>
      </ScrollView>

      <FooterComponent />
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  backgroundColor: "#fff",
  fontSize: 15
};