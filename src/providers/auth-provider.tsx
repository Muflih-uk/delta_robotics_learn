"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { AUTH_KEYS } from "@/constants/auth";
import { api, setTokens, clearTokens, getTokens } from "../lib/api";
import type { User, RegisterRequest } from "../types";

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { access, refresh } = getTokens();
    if (!access && !refresh) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    if (access) {
      api
        .verifyToken()
        .then((res) => {
          if (res.data?.user) setUser(res.data.user);
        })
        .catch(() => {
          if (refresh) {
            return api.refreshToken(refresh).then((r) => {
              if (r.data) {
                setTokens(r.data.access_token, r.data.refresh_token);
                setCookie(AUTH_KEYS.ACCESS_TOKEN, r.data.access_token, 3600);
                return api.verifyToken().then((v) => {
                  if (v.data?.user) setUser(v.data.user);
                });
              }
            });
          }
        })
        .catch(() => clearTokens())
        .finally(() => setIsLoading(false));
    } else if (refresh) {
      api.refreshToken(refresh).then((r) => {
        if (r.data) {
          setTokens(r.data.access_token, r.data.refresh_token);
          setCookie(AUTH_KEYS.ACCESS_TOKEN, r.data.access_token, 3600);
          return api.verifyToken().then((v) => {
            if (v.data?.user) setUser(v.data.user);
          });
        }
      })
      .catch(() => clearTokens())
      .finally(() => setIsLoading(false));
    } else {
      Promise.resolve().then(() => setIsLoading(false));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login({ email, password });

    if (!res.success) {
      throw new Error(res.message || "Login failed");
    }
    setTokens(res.access_token, res.refresh_token);
    setCookie(AUTH_KEYS.ACCESS_TOKEN, res.access_token, 3600);
    setCookie("user_role", res.user.role, 3600);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const res = await api.register(data);
    if (!res.success) throw new Error(res.message || "Registration failed");
    setTokens(res.access_token, res.refresh_token);
    setCookie(AUTH_KEYS.ACCESS_TOKEN, res.access_token, 3600);
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch {}
    clearTokens();
    clearCookie(AUTH_KEYS.ACCESS_TOKEN);
    clearCookie("user_role");
    setUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
