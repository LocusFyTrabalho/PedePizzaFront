import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "@/routes/Public/publicRoute";
import { PrivateRoutes } from "@/routes/Private/privateRoute";

const AppNavigator = () => {
  
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {userIsLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default AppNavigator;