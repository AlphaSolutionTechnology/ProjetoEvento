// src/hooks/useAuth.js
// se necessario utilizar em outras partes do projeto

import { useEffect } from 'react';

const useAuth = (platform, clientId, callback) => {
  useEffect(() => {
    const initializeAuth = () => {
      if (platform === 'google' && window.google && google.accounts) {
        google.accounts.id.initialize({
          client_id: clientId,
          callback,
        });
        google.accounts.id.prompt();
      }
      // Lógica de autenticação para LinkedIn ou Apple
    };

    if (!window.google || !google.accounts) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeAuth;
      document.body.appendChild(script);
    } else {
      initializeAuth();
    }
  }, [platform, clientId, callback]);
};

export default useAuth;
