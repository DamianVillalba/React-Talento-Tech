import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";

interface ContextType {
  token: string | null;
  loading: boolean;
	login: () => void;
	logout: () => void;
}

const AuthContext = createContext<ContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
	const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //pido el token siempre que se cargue el context para mantener la sesion activa
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) setToken(token);
    setLoading(false);
	}, []);

	const login = () => {
		// Simulando la creación de un token (en una app real, esto sería generado por un servidor)
		const token = "token_simulado";
		localStorage.setItem("authToken", token);
		setToken(token);
	};
	const logout = () => {
		localStorage.removeItem("authToken");
		setToken(null);
	};
	return (
		<AuthContext.Provider value={{ token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
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
