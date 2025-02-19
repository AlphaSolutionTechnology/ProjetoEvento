import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import NotificationButton from '../notification/NotificationButton';
import ThemeToggle from '../ThemeToggle';
import AccountMenu from '../AccountMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Otimização com useCallback
  const handleNavigateHome = useCallback(() => {
    if (window.location.pathname === "/home") {
      window.location.reload(); // Atualiza a página se já estiver na Home
    } else {
      navigate('/home');
    }
  }, [navigate]);

  // Atualiza a largura da janela
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Adiciona o ouvinte de redimensionamento
    window.addEventListener("resize", handleResize);

    // Limpa o ouvinte ao desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Fecha o menu em telas grandes
  useEffect(() => {
    if (windowWidth >= 768) {
      setMenuOpen(false);
    }
  }, [windowWidth]);

  return (
    <header className="p-6 flex justify-between items-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-lg shadow-lg relative z-50">
      <h1
        onClick={handleNavigateHome}
        className="text-2xl font-bold cursor-pointer"
      >
        Home
      </h1>

      {/* Ícones em telas grandes */}
      <nav className="hidden md:flex items-center gap-4">
        <NotificationButton />
        <ThemeToggle />
        <AccountMenu />
      </nav>

      {/* Menu Hamburguer para telas pequenas */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu suspenso quando o hamburguer está aberto */}
      {menuOpen && (
        <nav className="absolute top-full right-4 mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex flex-row items-center gap-4">
          <NotificationButton />
          <ThemeToggle />
          <AccountMenu />
        </nav>
      )}
    </header>
  );
};

export default Header;
