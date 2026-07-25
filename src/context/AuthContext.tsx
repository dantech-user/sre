import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (data: { firstName: string; lastName: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const TOKEN_KEY = "hydracity.authToken";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Placeholder auth flow backed by SecureStore. Swap the mock calls below
 * for real API requests (see src/services) once the backend is wired up.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(TOKEN_KEY).then((token) => {
      // TODO: exchange stored token for the current user via the API.
      setIsLoading(false);
    });
  }, []);

  const login: AuthContextValue["login"] = async (email, _password) => {
    await SecureStore.setItemAsync(TOKEN_KEY, "mock-token");
    setUser({ id: "1", firstName: "Usuário", lastName: "HydraCity", email });
  };

  const signUp: AuthContextValue["signUp"] = async (data) => {
    await SecureStore.setItemAsync(TOKEN_KEY, "mock-token");
    setUser({ id: "1", firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, isLoading, login, signUp, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
