import React from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const QRCodeSection = ({ userData, textColor, paperColor }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className={`text-lg mb-4 ${textColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Escaneie este QR Code para se conectar comigo.
      </motion.p>

      <motion.div
        className="inline-block p-4 rounded-full"
        style={{ backgroundColor: paperColor }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <QRCode value={String(userData.unique_code)} size={255} />
      </motion.div>

      <motion.p
        className="mt-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Ou Digite o código: {userData.unique_code}
      </motion.p>
    </motion.div>
  );
};

export default QRCodeSection;
