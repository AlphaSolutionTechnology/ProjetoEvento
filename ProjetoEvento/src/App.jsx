import React from "react";
import { Routes, Route } from "react-router-dom";
import Questoes from "./pages/Questoes";
import ThemeToggle from "./components/toggleDarkMode";
import { useAuth } from "./context/AuthContext";
import ConnectPage from "./pages/ConnectPage";
import Home from "./pages/home";
import LoginPage from "./pages/LoginPage";
import PalestrasList from "./pages/palestrasList";
import ParentComponent from "./pages/ParentComponent";
import WebSTest from "./pages/WebSTest";
import AdmQuizz from "./pages/admQuizz";
import { WebSocketProvider } from "./context/WebSocketContext"; // Importa o contexto WebSocket
import NotificationButton from "./components/button/NotificationButton";
import QRScanner from "./components/QRScanner";


function App() {
  const { user } = useAuth(); // pode ser null ou com dados

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
          <Route path="/websocket" element={<WebSTest />} />
          <Route path='/admQuizz' element={<AdmQuizz/>} /> 
        </Routes>
      </div>
    </WebSocketProvider>
  );
}

export default App;