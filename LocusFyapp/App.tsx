import React from "react";
import AppNavigator from "@/navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    // O Provider gerencia os cálculos de safe area em segundo plano para o app todo
    <SafeAreaProvider>
      {/* O SafeAreaView aplica o espaçamento (padding) automático no topo e na base */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}