import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";
import GoogleSignIn from "../components/GoogleSignIn";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage({ type: "success", text: "Login realizado com sucesso!" });
        localStorage.setItem("user_data", JSON.stringify(data));
        navigate("/home")
      } else {
        setMessage({ type: "error", text: data.message || "Erro ao fazer login" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 8){
      setMessage("Crie uma senha com pelo menos 8 caracteres!");
      setLoading(false)
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: null,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          uniqueCode: null,
          redesocial: null,
        }),
      });

      if (response.status === 201) {
        setMessage({ type: "success", text: "Usuário registrado com sucesso!" });
        setIsLogin(true);
      } else {
        const errorMsg = await response.text();
        setMessage({ type: "error", text: errorMsg || "Erro ao registrar" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-8"
      >
        <span className="block">Seja bem-vindo ao</span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          Eventfy
        </motion.span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-11/12 sm:w-3/4 lg:w-1/3 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-2xl border border-white/10"
      >
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <UserPlus
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
                required
              />
            </motion.div>
          )}

          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              required
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              required
            />
          </motion.div>

          {!isLogin && (
            <>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Repita sua senha"
                  required
                />
              </motion.div>
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} flex items-center justify-center gap-2 rounded-lg transition duration-300 font-semibold text-white`}
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Registrar"}
          </motion.button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.type === "error" ? "text-red-500" : "text-green-400"}`}>
            {message.text}
          </p>
        )}

        <div className="text-center mt-4">
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(null);
            }}
            className="text-blue-400 cursor-pointer hover:underline transition duration-300"
          >
            {isLogin
              ? "Não tem uma conta? Registre-se"
              : "Já tem uma conta? Faça login"}
          </span>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">ou</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <GoogleSignIn />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
