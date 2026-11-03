import { createContext, useContext, useState } from "react";
import { readStorage, writeStorage, removeStorage } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage("user", null));

  function login(user) {
    setUser(user);
    writeStorage("user", user);
  }

  function logout() {
    setUser(null);
    removeStorage("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
