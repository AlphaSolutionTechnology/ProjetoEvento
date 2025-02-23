import React from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const QRCodeSection = ({ userData }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Texto de instrução */}
      <motion.p
        className="text-lg text-gray-800 dark:text-gray-200 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Escaneie este QR Code para se conectar comigo.
      </motion.p>

      {/* QR Code com borda de contraste */}
      <motion.div
        className="inline-block p-4 bg-white rounded-2xl shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <QRCode
          value={String(userData.unique_code)}
          size={200}
          bgColor="transparent"
          fgColor="black"
        />
      </motion.div>

      {/* Código numérico abaixo do QR Code */}
      <motion.p
        className="mt-4 text-sm text-gray-800 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Ou digite o código: <span className="font-semibold">{userData.unique_code}</span>
      </motion.p>
    </motion.div>
  );
};

export default QRCodeSection;
