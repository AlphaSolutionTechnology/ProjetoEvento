import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Questoes from './pages/Questoes';
import AuthPage from './pages/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/questionshome" element={<Questoes />} />
        <Route path="login" element={<AuthPage />} />
      </Routes>
    </div>
    
  );
}

export default App;
