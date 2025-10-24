"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthContext");

  return context;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user: null, authenticated: false }}>
      {children}
    </AuthContext.Provider>
  );
}
