import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";
import GoogleSignIn from "../components/GoogleSignIn";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 overflow-hidden">
      {/* Círculos decorativos com blur */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-10 left-10 w-40 h-40 bg-blue-500 opacity-30 blur-3xl rounded-full"
      ></motion.div>
      
      <motion.div 
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 right-20 w-52 h-52 bg-green-800 opacity-30 blur-3xl rounded-full"
      ></motion.div>

      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 left-32 w-36 h-36 bg-pink-500 opacity-30 blur-3xl rounded-full"
      ></motion.div>

      {/* Título animado */}
      <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-8 relative z-10"
    >
      <span className="block">Seja bem-vindo ao</span>
      <motion.span 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
      >
        Eventfy
      </motion.span>
    </motion.h1>


      {/* Card Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-11/12 sm:w-3/4 lg:w-1/3 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-2xl border border-white/10"
      >
        <form className="space-y-4">
          {!isLogin && (
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <UserPlus className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
              />
            </motion.div>
          )}

          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 rounded-lg transition duration-300 font-semibold text-white"
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {isLogin ? "Entrar" : "Registrar"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 cursor-pointer hover:underline transition duration-300"
          >
            {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
          </span>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">ou</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
          <GoogleSignIn />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
