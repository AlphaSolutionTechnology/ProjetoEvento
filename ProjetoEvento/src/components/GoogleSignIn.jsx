import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!googleClientId) {
      console.error("Google Client ID não foi configurado no .env.");
      return;
    }

    // Verifica se o usuário já está autenticado
    checkAuthentication();

    // Carrega o script do Google
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/validate", {
        method: "POST",
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem('user_data',JSON.stringify(data)); 
        navigate("/home"); 
      } else {
        console.log("Usuário não autenticado.");
        setIsAuthenticated(false); 
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  const initializeGoogleSignIn = () => {
    if (isAuthenticated) return; // Não exibe o botão se já estiver autenticado

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );
  };

  const handleCredentialResponse = (response) => {
    console.log("Token JWT recebido:", response.credential);

    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) =>{
        localStorage.setItem('user_data',JSON.stringify(res.json())); 
        navigate('/home');
      })
      .catch((error) => {
        console.error("Erro ao autenticar com Google:", error);
        navigate('/googletest');
      });
  };

  if (isAuthenticated) {
    return <div>Redirecionando...</div>; // Opcional: Indicador de redirecionamento
  }

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default GoogleSignIn;
