import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Importa o AuthContext

const GoogleSignIn = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const { setUser } = useAuth(); // Pega a função setUser do contexto de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!googleClientId) {
      console.error("Google Client ID não foi configurado no .env.");
      return;
    }

    checkAuthentication();

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
        localStorage.setItem("user_data", JSON.stringify(data));
        setUser(data); // 🔥 Atualiza o estado global imediatamente

        if (location.pathname === "/login") {
          navigate("/home");
        }
      } else {
        console.log("Usuário não autenticado.");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  const initializeGoogleSignIn = () => {
    if (isAuthenticated) return;

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      {
        theme: "outline",
        size: "large",
        width: "240px",
        height: "50px",
        text: "continue_with",
        locale: "pt-BR",
      },
    );
  };

  const handleCredentialResponse = (response) => {
    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao autenticar com o Google");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados do usuário recebidos:", data);
        localStorage.setItem("user_data", JSON.stringify(data));
        setUser(data); // 🔥 Atualiza o estado global imediatamente
        navigate("/home");
      })
      .catch((error) => {
        console.error("Erro ao autenticar com Google:", error);
        navigate("/login");
      });
  };

  if (isAuthenticated) {
    return <div>Redirecionando...</div>;
  }

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default GoogleSignIn;
