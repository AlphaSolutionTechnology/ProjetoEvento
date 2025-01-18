import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Questoes from './pages/Questoes';
import AuthPage from './pages/login';
import ThemeToggle from './components/toggleDarkMode';  
import { useAuth } from './context/AuthContext';
import TestConnection from './pages/TestConnection'

function App() {
  const { user } = useAuth(); // pode ser null ou com daddos
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header com o botão de alternância de tema */}
      <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
        <h1 className="text-xl font-bold">LOGO</h1>
        <ThemeToggle />
      </header>

      {/* Rotas da aplicação */}
      <Routes>
        <Route path="/home" element={user ? <Home /> : <AuthPage />} /> 
        <Route path="/login" element={<AuthPage />} />
        <Route path="quizz" element={<Questoes />} />
        <Route path="/" element={<AuthPage />} />
        <Route path='test' element={<TestConnection/>}/>
      </Routes>
    </div>
  );
}

export default App;