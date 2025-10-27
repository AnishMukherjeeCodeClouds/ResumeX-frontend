"use client";

import { ensureAuthenticated } from "@/app/(general)/(protected)/auth-action";
import { checkAuthenticated } from "@/app/(general)/(protected)/auth-check";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  updateAuthState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  isAuthenticated: false,
  updateAuthState: async () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthContext");

  return context;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchAuthState = useCallback(async () => {
    const isAuthenticated = await checkAuthenticated();
    setIsAuthenticated(isAuthenticated);
  }, []);

  const updateAuthState = useCallback(async () => {
    try {
      setLoading(true);
      const authenticatedUser = await ensureAuthenticated();
      setUser(authenticatedUser);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthState();

    const interval = setInterval(() => fetchAuthState(), 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuthenticated, updateAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
}
