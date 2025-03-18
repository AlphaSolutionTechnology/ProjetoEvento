import { motion } from "framer-motion";

const AuthHeader = ({ isLogin }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-9/12 text-left text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-8"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
      >
        {isLogin ? "Login" : "Registro"}
      </motion.span>
    </motion.h1>
  );
};

export default AuthHeader;
