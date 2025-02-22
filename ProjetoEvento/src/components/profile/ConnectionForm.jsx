import React from "react";
import { motion } from "framer-motion";
import { QrCode, Send } from "lucide-react";

const ConnectionForm = ({ inputCode, setInputCode, handleSendConnection, setIsScannerOpen }) => {
  return (
    <motion.div
      className="max-w-md mx-auto p-4 bg-white dark:bg-gray-900 shadow-md rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título */}
      <motion.p
        className="text-center text-gray-800 dark:text-gray-200 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Digite o código do usuário ou escaneie um QR Code para se conectar.
      </motion.p>

      {/* Botão de Escanear QR Code */}
      <motion.button
        className="w-full py-2 px-4 mb-4 flex items-center justify-center bg-blue-600 dark:bg-gray-700 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-gray-600 transition duration-300"
        onClick={() => setIsScannerOpen(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <QrCode className="mr-2" />
        Escanear QR Code
      </motion.button>

      {/* Input de Código */}
      <motion.input
        type="text"
        className="w-full py-2 px-4 mb-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 transition duration-200"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Inserir Código"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Botão de Conectar */}
      <motion.button
        className={`w-full py-2 px-4 flex items-center justify-center rounded-xl text-white transition duration-300 
          ${
            inputCode
              ? "bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
          }`}
        onClick={() => handleSendConnection(inputCode)}
        disabled={!inputCode} // Desabilita o botão se inputCode estiver vazio
        whileHover={{ scale: inputCode ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Send className="mr-2" />
        Conectar
      </motion.button>
    </motion.div>
  );
};

export default ConnectionForm;
