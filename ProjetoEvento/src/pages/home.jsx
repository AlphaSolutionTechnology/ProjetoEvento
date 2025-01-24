import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Importa o hook de tema
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate para navegação

function Home() {
  const { darkMode } = useTheme(); // Acessa o estado global do tema
  const navigate = useNavigate(); // Hook para navegação

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center ${
        darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}
    >
      {/* Título da Página */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-8 text-center font-bold">
        Bem-vindo ao Painel!
      </h1>

      {/* Seção de Palestras */}
      <div
        className={`w-11/12 sm:w-3/4 h-auto p-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } flex flex-col justify-center items-center m-4 rounded-lg shadow-lg border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
          Gerencie suas Palestras
        </h2>
        <button
          onClick={() => navigate('/palestras')} // Redireciona para o PalestrasList
          className="px-6 py-3 bg-blue-500 text-white font-semibold text-base lg:text-lg rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transform transition-all duration-300"
        >
          Acessar Palestras
        </button>
      </div>
    </div>
  );
}

export default Home;
