import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native"; // Importado para a tela de segurança
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "@/routes/types";
import { AuthContext } from "@/context/AuthContext";

// Seus imports de Views permanecem iguais...
import HomeView from "@/views/homeView";
import PerfilView from "@/views/perfilView";
import MyHoursView from "@/views/myHoursView";
import RegisterUserView from "@/views/registrarUsuario";
import UsersListView from "@/views/usersListView";
import DashboardView from "@/views/dashboardView";
import EmployeeListView from "@/views/employeeListView";
import HourPaymentView from "@/views/hourPaymentView";
import mapView from "@/views/mapView"; 
import MapView from "react-native-maps";

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Telas exclusivas de EMPLOYEE */}
      {user.role === "EMPLOYEE" && (
        <>
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="Perfil" component={PerfilView} />
          <Stack.Screen name="Horas" component={MyHoursView} />
        </>
      )}

      {/* Telas exclusivas de HR */}
      {user.role === "HR" && (
        <>
          <Stack.Screen name="ListaUsuario" component={UsersListView} />
          <Stack.Screen name="RegistrarUsuario" component={RegisterUserView} />
        </>
      )}

      {/* Telas exclusivas de MANAGER */}
      {user.role === "ADMIN" && (
        <>
          <Stack.Screen name="Dashboard" component={DashboardView} />
          <Stack.Screen name="ListaFuncionarios" component={EmployeeListView} />
          <Stack.Screen name="PagamentoHoras" component={HourPaymentView} />
          <Stack.Screen name="Mapa" component={mapView} />
        </>
      )}
    </Stack.Navigator>
  );
};