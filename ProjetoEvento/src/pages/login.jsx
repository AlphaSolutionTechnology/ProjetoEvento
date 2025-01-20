import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; 
import googleIcon from "../assets/logo-google.svg"; 
import appleIcon from "../assets/apple-logo.svg";
import linkedinIcon from "../assets/linkedin-icon.png";

function AuthPage() {
  const { darkMode, setDarkMode } = useTheme(); // Obtém e define o tema global do contexto
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e registro

  function handleCredentialResponse(response) {
    console.log("Token JWT recebido:", response.credential);
    if (response.credential) {
      fetch("http://localhost:8080/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Usuário autenticado:", data);
        })
        .catch((err) => console.error("Erro na autenticação:", err));
    } else {
      console.error("Nenhum token recebido!");
    }
  }

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && google.accounts) {
        google.accounts.id.initialize({
          client_id:
            "937916098858-8ekrflam5ad65379jqocah9l2dlrjtrq.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        google.accounts.id.prompt()
        console.log("Google Sign-In inicializado!");
      } else {
        console.error("Google Sign-In não inicializado!");
      }
    };

    if (!window.google || !google.accounts) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  const handleGoogleSignIn = () => {

    if (window.google && google.accounts) {
      console.log("Iniciando autenticação do Google...");
      google.accounts.id.prompt(); // Inicia o fluxo de autenticação do Google
      console.log("Autenticação do Google iniciada!");
    } else {
      console.error("Google Sign-In não inicializado!");
    }

  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Título da Página */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center">
        {isLogin ? "Login" : "Registro"}
      </h1>

      {/* Formulário de Login ou Registro */}
      <div
        className={`w-11/12 sm:w-3/4 lg:w-1/2 ${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        } rounded-lg p-6 shadow-lg`}
      >
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2">Nome</label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white focus:ring-blue-500"
                    : "bg-gray-100 text-black focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
                placeholder="Digite seu nome"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-blue-500"
                  : "bg-gray-100 text-black focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Senha</label>
            <input
              type="password"
              className={`w-full px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-white focus:ring-blue-500"
                  : "bg-gray-100 text-black focus:ring-blue-500"
              } focus:outline-none focus:ring-2`}
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-lg transition duration-300`}
          >
            {isLogin ? "Entrar" : "Registrar"}
          </button>
        </form>

        {/* Alternar entre Login e Registro */}
        <div className="text-center mt-4">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isLogin
              ? "Não tem uma conta? Registre-se"
              : "Já tem uma conta? Faça login"}
          </span>
        </div>

        {/* Separador para opções de autenticação */}
        <div className="my-6 border-t"></div>

        {/* Botões de Autenticação */}
        <div className="flex flex-col gap-4">

          {/* Google botao autenticador */}
          <button
            onClick={handleGoogleSignIn}
            className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } transition duration-300`}
          > 
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            Entrar com Google
          </button>

          {/* Apple botao autenticador */}
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-gray-300 hover:bg-gray-400"
            } transition duration-300`}
          >
            <img src={appleIcon} alt="Apple" className="w-5 h-5" />
            Entrar com Apple
          </button>

          {/* LinkedIn botao autenticador */}
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300`}
          >
            <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
            Entrar com LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
