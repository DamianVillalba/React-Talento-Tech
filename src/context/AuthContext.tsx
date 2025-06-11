import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ContextType {
    user: string;
    login : (username : string) => void;
    logout :() => void;
}

const AuthContext = createContext<ContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState("");


  const login = (username : string) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `fake-token-${username}`;
    localStorage.setItem('authToken', token);
    setUser(username);
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser("");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider> );
}

// Hook para usar el contexto
export const useAuthContext = (): ContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
};

export default AuthContext;