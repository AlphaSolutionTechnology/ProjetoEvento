// src/components/AuthPage.js
import React from 'react';
import googleIcon from '../assets/logo-google.svg'; // Importar o ícone do Google
import linkedinIcon from '../assets/linkedin-icon.png'; // Importar o ícone do LinkedIn
import appleIcon from '../assets/apple-logo.svg'; // Importar o ícone da Apple
import AuthButton from '../components/AuthButton'; // Importar o componente AuthButton
import { useTheme } from '../context/ThemeContext'; // Importar o contexto de tema
import { useState } from 'react'; // Importar o hook de estado
import GoogleSignIn from '../components/GoogleSignIn';

const AuthPage = () => {
    const { darkMode, setDarkMode } = useTheme();
    const [isLogin, setIsLogin] = useState(true);
  
    const handleAuthSuccess = (data) => {
      console.log("Usuário autenticado com sucesso:", data);
    };
  
    const handleAuthError = (err) => {
      console.error("Erro na autenticação:", err);
    };
  
    return (
      <div
        className={`min-h-screen w-full flex flex-col justify-center items-center ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >

        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center">
          {isLogin ? "Login" : "Registro"}
        </h1>

        <div
          className={`w-11/12 sm:w-3/4 lg:w-1/2 ${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          } rounded-lg p-6 shadow-lg`}
        >
        {/* Formulário de Login ou Registro */}
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

        {/* Botões de autenticação social */}
        <div className="flex flex-col gap-4">
          <GoogleSignIn/>
          <AuthButton
            platform="google"
            clientid={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
            icon={googleIcon}
            buttonText="Entrar com Google"
            
          />
          <AuthButton
            platform="linkedin"
            clientid="78v1z2j1w0v8e8"
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
            icon={linkedinIcon}
            buttonText="Entrar com LinkedIn"
          />
          <AuthButton
            platform="apple"
            clientid="com.example.apple"
            onSuccess={handleAuthSuccess}
            onError={handleAuthError}
            icon={appleIcon}
            buttonText="Entrar com Apple"
          />
        </div>
        </div>
      </div>
    );
  };
  
  export default AuthPage;
  