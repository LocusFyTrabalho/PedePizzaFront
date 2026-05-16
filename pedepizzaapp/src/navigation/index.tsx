import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginView from "@/views/loginView/LoginView";
import HomeView from "@/views/homeView/HomeView";

// Importa a lista de tipos das rotas para garantir que o Stack respeite nossas regras
import { RootStackParamList } from "@/types/navigationTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
     
      initialRouteName="Login"
     
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="Login"
        component={LoginView}
      />
      

      <Stack.Screen
        name="Home"
        component={HomeView}
      />
    </Stack.Navigator>
  );
};


export default AppNavigator;