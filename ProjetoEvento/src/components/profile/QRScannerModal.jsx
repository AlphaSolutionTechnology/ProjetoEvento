import React from "react";
import { motion } from "framer-motion";
import QRScanner from "../QRScanner";

const QRScannerModal = ({
  isScannerOpen,
  setIsScannerOpen,
  handleScan,
  darkMode,
}) => {
  // Se isScannerOpen for false, não renderiza o modal
  if (!isScannerOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`p-6 rounded-lg shadow-xl max-w-sm w-full text-center relative ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h6
          className="mb-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Escaneando QR Code
        </motion.h6>

        <motion.div
          className="flex justify-center items-center mb-4 border rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <QRScanner onScan={handleScan} />
        </motion.div>

        <motion.button
          className={`mt-4 px-6 py-2 border rounded-lg ${
            darkMode
              ? "text-white border-purple-400 hover:bg-purple-400 hover:text-white"
              : "text-gray-800 border-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setIsScannerOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Fechar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QRScannerModal;
