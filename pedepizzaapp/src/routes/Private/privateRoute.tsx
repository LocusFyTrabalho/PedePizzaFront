import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeView from "@/views/homeView/HomeView";
import DashBoardView from "@/views/dashBoardView/dashBoardView";
import CarrinhoView from "@/views/carrinhoView/carrinhoView";
import PedidoView from "@/views/pedidoView/pedidoView";
import HistoricoView from "@/views/historicoView/historicoView";
import PerfilView from "@/views/perfilView/perfilView";
import AceitarPedidoView from "@/views/aceitarPedidoView/AceitarPedidoView";
import EditarCardapioView from "@/views/editarCardapioView/editarCardapioView";


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