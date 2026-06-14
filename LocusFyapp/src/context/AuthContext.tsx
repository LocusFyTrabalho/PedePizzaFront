import React, { createContext, useState } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  user: { role: "ROLE_EMPLOYEE" | "ROLE_HR" | "ROLE_MANAGER" } | null;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

const [user] = useState({ role: "ROLE_MANAGER" as const });
// const [user] = useState({ role: "ROLE_EMPLOYEE" as const });
// const [user] = useState({ role: "ROLE_HR" as const });

  return (
    <AuthContext.Provider value={{ isAuthenticated: true, user }}>
      {children}
    </AuthContext.Provider>
  );
};