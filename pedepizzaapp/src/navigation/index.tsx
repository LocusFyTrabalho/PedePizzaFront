import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "@/routes/Public/publicRoute";
import { PrivateRoutes } from "@/routes/Private/privateRoute";

const AppNavigator = () => {
  // Estado que diz se o usuário está logado ou não
  // Mude para 'true' para testar direto as telas de dentro do app (Home)
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {userIsLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default AppNavigator;