import { useState } from 'react';
import './home.css'

function Home() {
  const [darkMode, setDarkMode] = useState(true); // Estado para alternar entre escuro e claro
  const isAdmin = true; // Define se o usuário é administrador (troque para "false" para testar)

  return (
    <>
      {/* Página inteira */}
      <div
        className={`min-h-screen w-full flex flex-col justify-center items-center ${
          darkMode ? 'bg-black' : 'bg-white'
        }`}
      >
        {/* Botão de Acessibilidade */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md text-sm sm:text-base lg:text-lg transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-200 text-black hover:bg-gray-300'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>

        {/* Título da Página */}
        <h1
          className={`${
            darkMode ? 'text-white' : 'text-black'
          } text-2xl sm:text-3xl lg:text-4xl mb-6 text-center`}
        >
          Bem-vindo, **Nome do usuário**!
        </h1>

        {/* Primeiro Container */}
        <div
          className={`w-11/12 sm:w-3/4 h-[15%] ${
            darkMode ? 'bg-gray-800' : 'bg-gray-200'
          } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg`}
        >
          <h2
            className={`${
              darkMode ? 'text-white' : 'text-black'
            } text-base sm:text-lg lg:text-xl mb-4`}
          >
            Palestras
          </h2>
          <button
            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-blue-500 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transform transition duration-300"
          >
            Acessar Quiz
          </button>
        </div>

        {/* Segundo Container */}
        <div
          className={`w-11/12 sm:w-3/4 h-[15%] ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg`}
        >
          <h2
            className={`${
              darkMode ? 'text-white' : 'text-black'
            } text-base sm:text-lg lg:text-xl mb-4`}
          >
            QRCode
          </h2>
          <button
            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-green-500 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transform transition duration-300"
          >
            Gerar QRCode
          </button>
        </div>

        {/* Terceiro Container (Somente para Administradores) */}
        {isAdmin && (
          <div
            className={`w-11/12 sm:w-3/4 h-[15%] ${
              darkMode ? 'bg-gray-600' : 'bg-gray-400'
            } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg`}
          >
            <h2
              className={`${
                darkMode ? 'text-white' : 'text-black'
              } text-base sm:text-lg lg:text-xl mb-4`}
            >
              Administrar Questões
            </h2>
            <button
              className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-red-500 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transform transition duration-300"
            >
              Acessar Painel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
