// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Criação do contexto
const ThemeContext = createContext();

// Provedor de tema
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    NETWORKStorage.getItem("theme") === "dark" || false
  );

  // Sincronizar o estado com a classe "dark" no <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      NETWORKStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      NETWORKStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
