import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeView from "@/views/homeView";
import DashBoardView from "@/views/dashBoardView";
import CarrinhoView from "@/views/carrinhoView";
import PedidoView from "@/views/pedidoView";
import HistoricoView from "@/views/historicoView";
import PerfilView from "@/views/perfilView";
import AceitarPedidoView from "@/views/aceitarPedidoView";
import EditarCardapioView from "@/views/editarCardapioView";


import { PrivateStackParamList } from "@/routes/types";

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export const PrivateRoutes = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard" component={DashBoardView} />
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="Carrinho" component={CarrinhoView} />
      <Stack.Screen name="Pedido" component={PedidoView} />
      <Stack.Screen name="Historico" component={HistoricoView} />
      <Stack.Screen name="Perfil" component={PerfilView} />
      <Stack.Screen name="AceitarPedido" component={AceitarPedidoView} />
      <Stack.Screen name="EditarCardapio" component={EditarCardapioView} />
    </Stack.Navigator>
  );
};