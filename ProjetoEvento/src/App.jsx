import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Questoes from './pages/Questoes';
import CreateQuestoes from './pages/createquestoes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="quizz" element={<Questoes />} />
        <Route path="console" element={<CreateQuestoes />} />
      </Routes>
    </div>
  );
}

export default App;
