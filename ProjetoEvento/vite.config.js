import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexões externas
    port: 5173,      // Porta padrão do Vite
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '192.168.18.94-key.pem')), // Caminho da chave privada
      cert: fs.readFileSync(path.resolve(__dirname, '192.168.18.94.pem')),    // Caminho do certificado
    },
  },
});
