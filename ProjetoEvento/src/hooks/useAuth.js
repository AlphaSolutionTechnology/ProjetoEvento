// src/hooks/useAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Hook personalizado para usar o AuthContext
const useAuth = () => {
  return useContext(AuthContext); // Retorna os valores do contexto
};

export default useAuth;
