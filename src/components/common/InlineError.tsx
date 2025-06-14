import { AlertTriangle } from "lucide-react";

interface InlineErrorProps {
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

//Componente para mostrar errores "en linea" cuando un componente no critico no puede renderizarse debido a un error
const InlineError = ({ message = "Ocurrió un error.", showRetry = false, onRetry }: InlineErrorProps) => (
  <div className="w-full flex flex-col items-center justify-center py-10 bg-red-50 rounded-lg shadow-inner border border-red-200">
    <AlertTriangle className="text-red-500 mb-3" size={48} strokeWidth={1.5} />
    <p className="text-center text-red-700 font-bold text-lg mb-2">{message}</p>
    {showRetry && onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition font-semibold"
      >
        Reintentar
      </button>
    )}
  </div>
);

export default InlineError;