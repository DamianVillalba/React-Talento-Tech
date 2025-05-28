import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ContextType {
    isAuthenticated: boolean;
}

export const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {

    //no paso el set porque aun no se usa, pero la idea es pasar una funcion antes que el set en caso de necesitarlo
    const [isAuthenticated, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = (): ContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
};

export default AuthContext;
