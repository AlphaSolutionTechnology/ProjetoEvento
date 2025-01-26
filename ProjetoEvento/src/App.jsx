import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Questoes from "./pages/Questoes";
import ThemeToggle from "./components/toggleDarkMode";
import { useAuth } from "./context/AuthContext";
import ConnectPage from "./pages/ConnectPage";
import Home from "./pages/home";
import LoginPage from "./pages/LoginPage";
import PalestrasList from "./pages/palestrasList";
import ParentComponent from "./pages/ParentComponent";
import AdmQuizz from "./pages/admQuizz";
import { WebSocketProvider } from "./context/WebSocketContext"; // Importa o contexto WebSocket
import NotificationButton from "./components/button/NotificationButton";
import Chat from "./components/chatAI";


function App() {
  const { user,setUser } = useAuth(); // pode ser null ou com dados
  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/validate", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user_data', JSON.stringify(data));
      } else {

      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
  
    checkAuthentication();
  }, [])
  
  return (
    <WebSocketProvider> {/* Provedor do WebSocket */}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header com o botão de alternância de tema */}
        <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold">LOGO</h1>
          <NotificationButton/>
          <ThemeToggle />
        </header>

        {/* Rotas da aplicação */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={user ? <Home /> : <LoginPage />} />
          <Route path="/quizz" element={<Questoes />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/conectar" element={<ConnectPage />} />
          <Route path='/palestras' element={<PalestrasList/>}/>
          <Route path="/parent" element={<ParentComponent />} />
          <Route path='/admQuizz' element={<AdmQuizz/>} /> 
          <Route path="/chat-ia" element={<Chat />} />
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default App;