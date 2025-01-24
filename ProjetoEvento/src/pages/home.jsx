import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Importa o hook de tema
import { useAuth } from '../context/AuthContext';
import HomeUser from '../components/HomeUser'; // Importa o componente HomeUser
import HomePalestrante from '../components/HomePalestrante'; // Importa o componente HomePalestrante

function Home() {
  return (
    <div>
      {/* Renderiza os componentes HomeUser e HomePalestrante */}
      <HomeUser />
      <HomePalestrante />
    </div>
  );
}

export default Home;