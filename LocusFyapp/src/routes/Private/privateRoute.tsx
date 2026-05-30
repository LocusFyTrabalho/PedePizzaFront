import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "@/routes/types";
import HomeView from "@/views/homeView";
import PerfilView from "@/views/perfilView";
import MyHoursView from "@/views/myHoursView";
import RegisterUserView from "@/views/registrarUsuario";
import EmployeesListView from "@/views/employeesListView";

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateRoutes = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="Perfil" component={PerfilView} />
      <Stack.Screen name="Horas" component={MyHoursView} />
      <Stack.Screen name="RegistrarUsuario" component={RegisterUserView} />
      <Stack.Screen name="ListaFuncionario" component={EmployeesListView} />
    </Stack.Navigator>
  );
};