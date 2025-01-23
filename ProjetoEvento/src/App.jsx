import React from "react";
import { Routes, Route } from "react-router-dom";
import Questoes from "./pages/Questoes";
import ThemeToggle from "./components/toggleDarkMode";
import { useAuth } from "./context/AuthContext";
import TestConnection from "./pages/TestConnection";
import Home from "./pages/home";
import LoginPage from "./pages/LoginPage";
import { Test } from "./pages/Test";
import PalestrasList from "./pages/palestrasList";
import CreateQuestoes from "./components/createquestoes";
import ParentComponent from "./pages/ParentComponent";
import WebSTest from "./pages/WebSTest";
import AdmQuizz from "./pages/admQuizz";
import { WebSocketProvider } from "./context/WebSocketContext"; // Importa o contexto WebSocket


function App() {
  const { user } = useAuth(); // pode ser null ou com dados

  return (
    <WebSocketProvider> {/* Provedor do WebSocket */}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header com o botão de alternância de tema */}
        <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold">LOGO</h1>
          <ThemeToggle />
        </header>

        {/* Rotas da aplicação */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={user ? <Home /> : <LoginPage />} />
          <Route path="/quizz" element={<Questoes />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/test" element={<TestConnection />} />
          <Route path="/googletest" element={<Test />} />
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