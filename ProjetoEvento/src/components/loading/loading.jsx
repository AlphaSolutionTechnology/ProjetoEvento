import { Loader } from "lucide-react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="p-4 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader className="w-10 h-10 text-gray-700 dark:text-gray-300" />
        </motion.div>
        <p
          className="text-gray-700 dark:text-gray-300 text-lg"
          role="status"
          aria-live="polite"
        >
          Carregando...
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;
