import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const BasicModal = ({
  open,
  title,
  text,
  onClose,
  children,
  closeButtonText = "Fechar",
  width = 400,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-lg max-w-md w-full"
        style={{ width }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h2>
        )}

        {text && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">{text}</p>
        )}

        {children}
      </motion.div>
    </div>
  );
};

export default BasicModal;
