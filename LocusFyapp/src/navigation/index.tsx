import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "@/routes/Public/publicRoute";
import { PrivateRoutes } from "@/routes/Private/privateRoute";

const AppNavigator = () => {
// User logado
  // const [user, setUser] = useState({ name: '' });
// USUARIO DESLOGADO
const [user,setUser]=useState()


  return (
    <NavigationContainer>
      {user ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default AppNavigator;