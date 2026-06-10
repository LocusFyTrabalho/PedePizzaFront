import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "@/routes/types";

// Employee Views
import HomeView from "@/views/homeView";
import PerfilView from "@/views/perfilView";
import MyHoursView from "@/views/myHoursView";

// HR Views
import RegisterUserView from "@/views/registrarUsuario";
import UsersListView from "@/views/usersListView";

// Manager Views
import DashboardView from "@/views/dashboardView";
import EmployeeListView from "@/views/employeeListView";
import HourPaymentView from "@/views/hourPaymentView";

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateRoutes = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* Sem travas de roles por enquanto para o seu Footer temporário funcionar geral */}
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="Perfil" component={PerfilView} />
      <Stack.Screen name="Horas" component={MyHoursView} />
      
      <Stack.Screen name="ListaUsuario" component={UsersListView} />
      <Stack.Screen name="RegistrarUsuario" component={RegisterUserView} />
      
      <Stack.Screen name="Dashboard" component={DashboardView} />
      <Stack.Screen name="ListaFuncionarios" component={EmployeeListView} />
      <Stack.Screen name="PagamentoHoras" component={HourPaymentView} />
    </Stack.Navigator>
  );
};