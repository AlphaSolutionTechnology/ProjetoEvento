import React, { createContext, useState, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser] = useState({
        // Altere os valores para testar a aplicação
        name: "Usul", // Nome do usuário
        isAdmin: true, // Se o usuário é admin ou não
        role: "admin", // Papel do usuário
        token: "123456789", // Token de autenticação
        email: "", // Email do usuário
    });
    

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};