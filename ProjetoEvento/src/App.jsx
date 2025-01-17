import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Questoes from './pages/Questoes';
import TestConnection from './pages/TestConnection';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/questions" element={<Questoes />} />
        <Route path='test' element={<TestConnection />}/>
      </Routes>
    </div>
  );
}

export default App;
