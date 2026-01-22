import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  });
  async function register(name, email, password) {
    const res = await api.post("/api/users/register", { name, email, password });
    localStorage.setItem("auth", JSON.stringify(res.data));
    setUser(res.data);
  }
  async function login(email, password) {
    const res = await api.post("/api/users/login", { email, password });
    localStorage.setItem("auth", JSON.stringify(res.data));
    setUser(res.data);
  }
  function logout() {
    localStorage.removeItem("auth");
    setUser(null);
  }
  const value = useMemo(() => ({ user, register, login, logout }), [user]); //Provides authentication state and actions
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
