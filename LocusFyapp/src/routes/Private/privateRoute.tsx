import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "@/context/AuthContext";

import HomeView from "@/views/homeView";
import PerfilView from "@/views/perfilView";
import MyHoursView from "@/views/myHoursView";
import RegisterUserView from "@/views/registrarUsuario";
import UsersListView from "@/views/usersListView";
import DashboardView from "@/views/dashboardView";
import EmployeeListView from "@/views/employeeListView";
import HourPaymentView from "@/views/hourPaymentView";
import MapViewScreen from "@/views/mapView";
import FooterComponent from "@/components/footer";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack separado para ADMIN (porque o Mapa precisa de stack navigation)
const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ListaFuncionarios" component={EmployeeListView} />
    <Stack.Screen name="Mapa" component={MapViewScreen} />
  </Stack.Navigator>
);

export const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FooterComponent {...props} />}
    >
      {user.role === "EMPLOYEE" && (
        <>
          <Tab.Screen name="Home" component={HomeView} />
          <Tab.Screen name="Horas" component={MyHoursView} />
          <Tab.Screen name="Perfil" component={PerfilView} />
        </>
      )}

      {user.role === "HR" && (
        <>
          <Tab.Screen name="ListaUsuario" component={UsersListView} />
          <Tab.Screen name="RegistrarUsuario" component={RegisterUserView} />
        </>
      )}

      {user.role === "ADMIN" && (
        <>
          <Tab.Screen name="Dashboard" component={DashboardView} />
          <Tab.Screen name="ListaFuncionarios" component={AdminStack} />
          <Tab.Screen name="PagamentoHoras" component={HourPaymentView} />
        </>
      )}
    </Tab.Navigator>
  );
};