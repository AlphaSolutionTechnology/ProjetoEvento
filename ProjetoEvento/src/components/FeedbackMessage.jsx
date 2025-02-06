// path: src/components/FeedbackMessage.jsx

import { motion } from "framer-motion";

function FeedbackMessage({ message }) {
  if (!message) return null;

  const isSuccess = message.includes("sucesso");

  return (
    <motion.p
      className={`mt-4 text-lg font-semibold transition-all ${
        isSuccess ? "text-green-500" : "text-red-500"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.p>
  );
}

export default FeedbackMessage;
