import { motion } from "framer-motion";

const HomeHeader = ({ userName }) => {
  return (
    <header>
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-center font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Bem-vindo, {userName}!
      </motion.h1>
      <p className="text-center text-base sm:text-lg text-gray-400 mb-6">
        O que você gostaria de fazer hoje?
      </p>
    </header>
  );
};

export default HomeHeader;