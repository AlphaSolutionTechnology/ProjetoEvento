import React from "react";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { Send } from "lucide-react";

const ConnectionForm = ({
  inputCode,
  setInputCode,
  handleSendConnection,
  setIsScannerOpen,
  darkMode,
  buttonColor,
}) => {
  const textColor = darkMode ? "text-white" : "text-gray-800";
  const buttonBgColor = darkMode ? buttonColor : "#1976D2";

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título */}
      <motion.p
        className={`text-center mb-4 ${textColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Digite o código do usuário ou escaneie um QR Code para se conectar.
      </motion.p>

      {/* Botão de Escanear QR Code */}
      <motion.button
        className={`w-full py-2 px-4 mb-4 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-800`}
        onClick={() => setIsScannerOpen(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <QrCode className="mr-2" /> {/* Usando o ícone de QR Code do Lucide */}
        Escanear QR Code
      </motion.button>

      {/* Input de Código */}
      <motion.input
        type="text"
        className={`w-full py-2 px-4 mb-4 rounded-lg 
          ${
            darkMode
              ? "bg-gray-800 text-white placeholder-gray-400"
              : "bg-white text-gray-800 placeholder-gray-600 border border-gray-300 focus:outline-none focus:border-blue-500"
          }`}
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Inserir Código"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Botão de Conectar */}
      <motion.button
        className={`flex flex-row space-x-2 justify-center w-full py-2 px-4 rounded-lg 
          ${
            inputCode
              ? darkMode
                ? "bg-purple-600 text-white"
                : "bg-blue-600 text-white"
              : buttonBgColor
          } 
          ${
            darkMode
              ? "hover:bg-purple-700 disabled:bg-gray-600"
              : "hover:bg-blue-700 disabled:bg-gray-300"
          } 
          disabled:opacity-50 focus:outline-none focus:ring-2 ${
            darkMode ? "focus:ring-purple-500" : "focus:ring-blue-500"
          }`}
        onClick={() => handleSendConnection(inputCode)}
        disabled={!inputCode} // Desabilita o botão se inputCode estiver vazio
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Send className="mr-2" />
        Conectar
      </motion.button>
    </motion.div>
  );
};

export default ConnectionForm;
