import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Обгортка для захищених сторінок:
 * <ProtectedRoute><Dashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}
