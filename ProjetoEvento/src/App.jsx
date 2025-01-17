import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import TestConnection from './pages/TestConnection';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='test' element={<TestConnection />}/>
      </Routes>
    </div>
  );
}

export default App;
