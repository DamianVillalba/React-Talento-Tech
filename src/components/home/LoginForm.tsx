import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const LoginForm = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (usuario === "admin" && password === "123") {
            login();
            navigate("/admin");
        } else {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg px-8 py-6 w-full max-w-sm"
        >
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
                Iniciar sesión
            </h2>
            <div className="mb-3">
                <label className="block text-gray-700 font-semibold mb-1">
                    Usuario:
                </label>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Ingrese su usuario"
                    autoFocus
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                    Contraseña:
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Ingrese su contraseña"
                />
            </div>
            {error && (
                <p className="mb-2 text-red-600 text-sm text-center">{error}</p>
            )}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition cursor-pointer"
            >
                Iniciar sesión
            </button>
        </form>
    );
}

export default LoginForm;