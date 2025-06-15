import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Дозволяє доступ до сервера з інших пристроїв в мережі
    port: 5173,       // Вказує порт, на якому буде працювати сервер
  }
})
