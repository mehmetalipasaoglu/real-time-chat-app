import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5207', // Backend API'nizin çalıştığı adres ve port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
