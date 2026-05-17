import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PublicStackParamList } from '@/routes/types';

import LoginView from '@/views/loginView/LoginView';
import CadastreseView from '@/views/cadastreseView/cadastreseView';
import RecuperarSenhaView from '@/views/recuperarSenhaView/recuperarSenhaView';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Cadastrese" component={CadastreseView} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaView} />
    </Stack.Navigator>
  );
}