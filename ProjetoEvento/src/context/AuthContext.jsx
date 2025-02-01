import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      // Carregar dados do localStorage inicialmente
      const storedUser = localStorage.getItem("user_data");
      return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(true);
  
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/validate", {
          method: "POST",
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user_data", JSON.stringify(data));
          setUser(data); // Atualiza o estado
        } else {
          localStorage.removeItem("user_data");
          setUser(null);
        }
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      checkAuthentication();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, isLoading, checkAuthentication }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);