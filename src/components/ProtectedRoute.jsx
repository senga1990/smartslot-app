// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Використання:
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 */
export default function ProtectedRoute({ children, redirectTo = "/" }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  // Поки ініціалізується стан з localStorage — нічого не рендеримо (або постав тут спінер)
  if (!ready) return null;

  // Неавторизованих відправляємо на redirectTo та зберігаємо, звідки прийшли
  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}
