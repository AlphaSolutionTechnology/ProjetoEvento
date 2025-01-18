import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import googleIcon from '../assets/logo-google.svg';
import linkedinIcon from '../assets/linkedin-icon.png';
import appleIcon from '../assets/apple-logo.svg';

import { useState, useEffect } from "react";
import googleIcon from "../assets/logo-google.svg";
import linkedinIcon from "../assets/linkedin-icon.png";
import appleIcon from "../assets/apple-logo.svg";

function AuthPage() {
  const { darkMode } = useTheme(); // Obtém o tema global do contexto
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e registro
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  function handleCredentialResponse(response) {
    console.log("Token JWT recebido:", response.credential);
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
  }

  useEffect(() => {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: "937916098858-8ekrflam5ad65379jqocah9l2dlrjtrq.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };
  }, []);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Título da Página */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center">
        {isLogin ? 'Login' : 'Registro'}
      </h1>
    <>
      <div
        className={`min-h-screen w-full flex flex-col justify-center items-center ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md text-sm sm:text-base lg:text-lg transition-colors duration-300 ${
              darkMode
                ? "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {darkMode ? "Modo Claro" : "Modo Escuro"}
          </button>
        </div>

        <h1
          className={`${
            darkMode ? "text-white" : "text-black"
          } text-2xl sm:text-3xl lg:text-4xl mb-6 text-center`}
        >
          {isLogin ? "Login" : "Registro"}
        </h1>

      {/* Formulário de Login ou Registro */}
      <div
        className={`w-11/12 sm:w-3/4 lg:w-1/2 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-200'
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
                    ? 'bg-gray-700 text-white focus:ring-blue-500'
                    : 'bg-gray-100 text-black focus:ring-blue-500'
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
                  ? 'bg-gray-700 text-white focus:ring-blue-500'
                  : 'bg-gray-100 text-black focus:ring-blue-500'
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
                  ? 'bg-gray-700 text-white focus:ring-blue-500'
                  : 'bg-gray-100 text-black focus:ring-blue-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg transition duration-300`}
          >
            {isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>

        {/* Alternar entre Login e Registro */}
        <div className="text-center mt-4">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isLogin
              ? 'Não tem uma conta? Registre-se'
              : 'Já tem uma conta? Faça login'}
          </span>
        </div>

        {/* Separador para opções de autenticação */}
        <div className="my-6 border-t"></div>

        {/* Botões de Autenticação */}
        <div className="flex flex-col gap-4">
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-500 hover:bg-red-600'
            } transition duration-300`}
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            Entrar com Google
          </button>
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-800'
                : 'bg-gray-300 hover:bg-gray-400'
            } transition duration-300`}
          >
            <img src={appleIcon} alt="Apple" className="w-5 h-5" />
            Entrar com Apple
          </button>
          <button
            className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-blue-700 hover:bg-blue-800'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-300`}
          >
            <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
            Entrar com LinkedIn
          </button>
        </div>
      </div>
    </div>
        <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-gray-800 bg-opacity-80 rounded-lg p-6 shadow-lg">
          <form>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-white mb-2">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu nome"
                />
              </div>
            )}
            <div id="g_id_signin" className="mb-4"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
