import React, { useState } from 'react';
import GoogleSignIn from '../components/GoogleSignIn';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-black dark:bg-gray-700 dark:text-white">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center">
        {isLogin ? "Login" : "Registro"}
      </h1>

      <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* Formulário de Login ou Registro */}
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2">Nome</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition duration-300"
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
        <div className="flex flex-col items-center">
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
