import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; // Importa a autenticação
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { UserIcon, ChartBar } from "lucide-react";

function Home() {
  const { darkMode } = useTheme();
  const { user, isLoading, checkAuthentication } = useAuth();
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsPageLoading(false);
    }
  }, [isLoading]);

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando página...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Título */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-center font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Bem-vindo, {user?.name}!
      </motion.h1>
      <p className="text-base sm:text-lg text-gray-400 mb-6">
        O que você gostaria de fazer hoje?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Card de Palestras */}
        <div
          className={`p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border flex flex-col items-center text-center`}
        >
          <ChartBar className="h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Gerencie suas Palestras</h2>
          <p className="text-gray-400 mb-4">
            Acesse, edite e organize suas palestras de forma prática.
          </p>
          <button
            onClick={() => navigate("/palestras")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
          >
            Acessar Palestras
          </button>
        </div>

        {/* Card de Conexões */}
        <div
          className={`p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border flex flex-col items-center text-center`}
        >
          <UserIcon className="h-12 w-12 text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Gerencie suas Conexões</h2>
          <p className="text-gray-400 mb-4">
            Conecte-se facilmente com outros usuários da plataforma.
          </p>
          <button
            onClick={() => navigate("/conectar")}
            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow-md hover:bg-purple-600 transition duration-300"
          >
            Conectar-se a outro usuário
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
