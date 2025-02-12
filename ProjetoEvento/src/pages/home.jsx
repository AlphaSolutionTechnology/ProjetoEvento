import React, { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { UserIcon, ChartBar } from "lucide-react";

function Home() {
  const { darkMode } = useTheme();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const retrieveName = (fullname) => {
    if (!fullname) return ""; // Verifica se o nome existe antes de processar
    const splittedName = fullname.split(" ");
    return splittedName.length > 1 ? `${splittedName[0]} ${splittedName[1]}` : splittedName[0];
  };



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
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Círculos decorativos com blur */}
     
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-10 left-10 w-40 h-40 bg-blue-400 dark:bg-blue-500 opacity-30 blur-3xl rounded-full"
      ></motion.div>

      <motion.div 
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 right-20 w-52 h-52 bg-green-300 dark:bg-green-800 opacity-30 blur-3xl rounded-full"
      ></motion.div>

      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 left-32 w-36 h-36 bg-pink-300 dark:bg-pink-500 opacity-30 blur-3xl rounded-full"
      ></motion.div>

      {/* Título */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-center font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Bem-vindo, {retrieveName(user?.name)}!
      </motion.h1>
      <p className="text-base sm:text-lg text-gray-400 mb-6">
        O que você gostaria de fazer hoje?
      </p>

      <div className={`grid ${user?.role === "Administrador" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-6 w-full max-w-4xl`}>
        {/* Se for administrador, mostrar "Gerencie suas Palestras" */}
        {user?.role === "Administrador" && (
          <motion.div
            className={`p-6 rounded-2xl shadow-xl ${
              darkMode
                ? "bg-gray-800 bg-opacity-70 backdrop-blur-lg border-gray-700"
                : "bg-white bg-opacity-70 backdrop-blur-lg border-gray-200"
            } border flex flex-col items-center text-center`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
        )}

        {/* Card de Conexões (Disponível para todos os usuários) */}
        <motion.div
          className={`p-6 rounded-2xl shadow-xl ${
            darkMode
              ? "bg-gray-800 bg-opacity-70 backdrop-blur-lg border-gray-700"
              : "bg-white bg-opacity-70 backdrop-blur-lg border-gray-200"
          } border flex flex-col items-center text-center`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
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
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
