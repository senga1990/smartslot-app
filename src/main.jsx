import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // ⬅️ тягнемо з .env

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
