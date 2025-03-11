import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToastMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_LINK}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToastMessage({
          type: "success",
          text: "Login realizado com sucesso!",
        });
        await new Promise((resolve) => {
          localStorage.setItem("user_data", JSON.stringify(data.data));
          setUser(data.data);
          resolve();
        });
        navigate("/home");
      } else {
        setToastMessage({
          type: "error",
          text: data.message || "Erro ao fazer login",
        });
      }
    } catch (error) {
      setToastMessage({
        type: "error",
        text: "Erro de conexão com o servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToastMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setToastMessage({ type: "error", text: "As senhas não coincidem" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setToastMessage({
        type: "error",
        text: "Crie uma senha com pelo menos 8 caracteres!",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_LINK}/api/auth/register`,
        {
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
        }
      );

      if (response.status === 201) {
        setToastMessage({
          type: "success",
          text: "Usuário registrado com sucesso!",
        });
        setIsLogin(true);
      } else {
        const errorMsg = await response.text();
        setToastMessage({
          type: "error",
          text: errorMsg || "Erro ao registrar",
        });
      }
    } catch (error) {
      setToastMessage({
        type: "error",
        text: "Erro de conexão com o servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    setIsLogin,
    formData,
    handleChange,
    handleLogin,
    handleRegister,
    loading,
    toastMessage,
    setToastMessage,
  };
};

export default useAuthForm;
