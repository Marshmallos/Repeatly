import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "./User";

export function AuthProvider({ children }: { children: ReactNode }) {
  //   const [user, setUser] = useState<User | null>(() => {
  //     return JSON.parse(localStorage.getItem("user") || "null");
  //   });
  const [user, setUser] = useState<User | null>(null);

  function login(userData: User) {
    setUser(userData);
    // localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    // localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
