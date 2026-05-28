import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PublicStackParamList } from '@/routes/types';
import LoginView from '@/views/loginView';

import RecuperarSenhaView from '@/views/recuperarSenhaView';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export function PublicRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginView} />

      <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaView} />
    </Stack.Navigator>
  );
}