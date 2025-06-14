import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";


const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { token, loading } = useAuthContext();

  if (loading) return <LoadingSpinner />

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;