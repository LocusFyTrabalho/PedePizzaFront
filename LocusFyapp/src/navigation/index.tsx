// import React, { useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { PublicRoutes } from "@/routes/Public/publicRoute";
// import { PrivateRoutes } from "@/routes/Private/privateRoute";

// const AppNavigator = () => {
  
//   const [userIsLoggedIn, setUserIsLoggedIn] = useState(true);

//   return (
//     <NavigationContainer>

//       {userIsLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      
//     </NavigationContainer>

//   );
// };

// export default AppNavigator;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importando todas as suas views diretamente usando o padrão de pasta index.tsx
import LoginView from "@/views/loginView";
import CadastreseView from "@/views/cadastreseView";
import RecuperarSenhaView from "@/views/recuperarSenhaView";
import HomeView from "@/views/homeView";
import DashBoardView from "@/views/dashBoardView";
import CarrinhoView from "@/views/carrinhoView";
import PedidoView from "@/views/pedidoView";
import HistoricoView from "@/views/historicoView";
import PerfilView from "@/views/perfilView";
import AceitarPedidoView from "@/views/aceitarPedidoView";
import EditarCardapioView from "@/views/editarCardapioView";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" // O app vai começar sempre na tela de Login
        screenOptions={{ headerShown: false }} // Esconde a barra padrão do topo
      >
        {/* --- FLUXO PÚBLICO LIBERADO --- */}
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Cadastrese" component={CadastreseView} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaView} />

        {/* --- FLUXO PRIVADO LIBERADO --- */}
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Dashboard" component={DashBoardView} />
        <Stack.Screen name="Carrinho" component={CarrinhoView} />
        <Stack.Screen name="Pedido" component={PedidoView} />
        <Stack.Screen name="Historico" component={HistoricoView} />
        <Stack.Screen name="Perfil" component={PerfilView} />
        <Stack.Screen name="AceitarPedido" component={AceitarPedidoView} />
        <Stack.Screen name="EditarCardapio" component={EditarCardapioView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;