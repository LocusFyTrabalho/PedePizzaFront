import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "@/routes/Public/publicRoute";
import { PrivateRoutes } from "@/routes/Private/privateRoute";
import { AuthContext } from "@/context/AuthContext"; 

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default AppNavigator;