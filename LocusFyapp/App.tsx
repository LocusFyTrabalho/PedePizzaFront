import React from "react";
import AppNavigator from "@/navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// 1. Importe o AuthProvider
import { AuthProvider } from "@/context/AuthContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar style="auto" />

        {/* 2. Coloque o AuthProvider abraçando o AppNavigator */}
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}