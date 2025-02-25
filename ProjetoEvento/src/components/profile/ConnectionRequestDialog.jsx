import React from "react";
import { motion } from "framer-motion";

const ConnectionRequestDialog = ({
  isDialogOpen,
  dialogData,
  handleAcceptConnection,
  handleDeclineConnection,
}) => {
  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center ${
        isDialogOpen ? "block" : "hidden"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isDialogOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <motion.h2
          className="text-xl font-semibold text-center text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Nova Solicitação de Conexão
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {dialogData?.fromUserName || "Um usuário"} quer se conectar com você.
        </motion.p>

        <div className="flex justify-between mt-4">
          <motion.button
            onClick={handleDeclineConnection}
            className="py-2 px-4 bg-red-500 text-white rounded-lg w-full mr-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Recusar
          </motion.button>
          <motion.button
            onClick={handleAcceptConnection}
            className="py-2 px-4 bg-green-500 text-white rounded-lg w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Aceitar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectionRequestDialog;
