import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AuthPage from './pages/login';
import ThemeToggle from './components/toggleDarkMode';  

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header com o botão de alternância de tema */}
      <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800">
        <h1 className="text-xl font-bold">Minha Aplicação</h1>
        <ThemeToggle />
      </header>

      {/* Rotas da aplicação */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;