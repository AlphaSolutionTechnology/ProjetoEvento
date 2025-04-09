import { motion } from "framer-motion";
import { UserPlus, Mail, Lock } from "lucide-react";

const AuthForm = ({ isLogin, formData, handleChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {!isLogin && (
        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
          <UserPlus className="absolute left-3 top-4 text-gray-400" size={20} />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full h-14 pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu nome"
            required
          />
        </motion.div>
      )}

      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
        <Mail className="absolute left-3 top-4 text-gray-400" size={20} />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-14 pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite seu email"
          required
        />
      </motion.div>

      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
        <Lock className="absolute left-3 top-4 text-gray-400" size={20} />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-14 pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite sua senha"
          required
        />
      </motion.div>

      {!isLogin && (
        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
          <Lock className="absolute left-3 top-4 text-gray-400" size={20} />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full h-14 pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repita sua senha"
            required
          />
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={loading}
        className={`w-full h-14 py-2 ${
          loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        } flex items-center justify-center gap-2 rounded-full transition duration-300 font-semibold text-white`}
      >
        {isLogin ? "Entrar" : "Registrar"}
      </motion.button>
    </form>
  );
};

export default AuthForm;