import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Questoes from './pages/Questoes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/questions" element={<Questoes />} />
      </Routes>
    </div>
  );
}

export default App;
