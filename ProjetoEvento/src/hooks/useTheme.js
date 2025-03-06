// src/hooks/useTheme.js
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

// Hook personalizado para usar o ThemeContext
const useTheme = () => {
  return useContext(ThemeContext); // Retorna os valores do contexto
};

export default useTheme;
