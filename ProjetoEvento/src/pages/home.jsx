import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Importa o hook de tema
import { useAuth } from '../context/AuthContext';
import QrScannedModal from '../components/BasicModal';
function Home() {
  const { darkMode } = useTheme(); // Acessa o estado global do tema
  const {user} = useAuth(); // Acessa o estado global de autenticação
  

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
      <QrScannedModal/>
      {/* Título da Página */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center">
        Bem-vindo, **Nome do usuário**!
      </h1>

      {/* Primeiro Container */}
      <div
        className={`w-11/12 sm:w-3/4 h-[15%] ${
          darkMode ? 'bg-gray-800' : 'bg-gray-200'
        } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg`}
      >
        <h2 className="text-base sm:text-lg lg:text-xl mb-4">Palestras</h2>
        <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-blue-500 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transform transition duration-300">
          Acessar Quiz
        </button>
      </div>

      {/* Segundo Container */}
      <div
        className={`w-11/12 sm:w-3/4 h-[15%] ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg`}
      >
        <h2 className="text-base sm:text-lg lg:text-xl mb-4">QRCode</h2>
        <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-green-500 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transform transition duration-300">
          Gerar QRCode
        </button>
      </div>

      {/* Terceiro Container (Somente para Administradores) */}
      {user.isAdmin && (
        <div
          className={`w-11/12 sm:w-3/4 h-[15%] ${
            darkMode ? 'bg-gray-600' : 'bg-gray-400'
          } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg`}
        >
          <h2 className="text-base sm:text-lg lg:text-xl mb-4">
            Administrar Questões
          </h2>
          <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-red-500 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transform transition duration-300">
            Acessar Painel
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
