import React from "react";
import AppNavigator from "@/navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext"; 
import { UserProvider } from "@/context/UserContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar style="auto" />

   
        <AuthProvider>
          <UserProvider>
            <AppNavigator />
          </UserProvider>
        </AuthProvider>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}