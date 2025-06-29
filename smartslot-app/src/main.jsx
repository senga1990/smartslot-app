import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { AuthProvider } from './components/AuthProvider'; // ✅ імпорт провайдера

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ обгортаємо App */}
      <App />
    </AuthProvider>
  </StrictMode>
);
