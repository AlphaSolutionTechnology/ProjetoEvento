import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Questoes from './pages/Questoes';
import AuthPage from './pages/login';
import TestConnection from './pages/TestConnection'

function App() {
  return (
    <div>
      <Routes>
        <Route path="quizz" element={<Questoes />} />
        <Route path="/" element={<AuthPage />} />
        <Route path='test' element={<TestConnection/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
