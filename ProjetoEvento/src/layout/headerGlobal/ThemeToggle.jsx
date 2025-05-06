import useTheme from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <motion.div
        animate={{
          rotate: darkMode ? 180 : 0, // Anima a rotação entre 0 e 180 graus
          transition: { duration: 0.4 }, // Durabilidade da animação
        }}
      >
        {darkMode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-6 h-6 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-6 h-6 text-gray-700" />
          </motion.div>
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
