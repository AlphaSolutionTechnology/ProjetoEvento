import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AuthPage from './pages/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="login" element={<AuthPage />} />
      </Routes>
    </div>
    
  );
}

export default App;
