import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import NotificationButton from '../notification/NotificationButton';
import ThemeToggle from '../ThemeToggle';
import AccountMenu from '../AccountMenu';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Importando AnimatePresence

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
    <header className="p-6 flex justify-between items-center bg-white dark:bg-gray-800 backdrop-blur-lg rounded-lg shadow-lg relative z-50">
      <h1
        onClick={handleNavigateHome}
        className="text-2xl font-bold cursor-pointer text-gray-900 dark:text-white hover:text-blue-500 transition-colors duration-300"
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
      <motion.button 
        className="md:hidden p-2 rounded-full  dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }} // Animação ao passar o mouse sobre o botão
        whileTap={{ scale: 0.95 }} // Animação ao clicar
        transition={{ duration: 0.2 }}
      >
        {menuOpen ? (
          <X size={28} className="text-gray-900 dark:text-white" />
        ) : (
          <Menu size={28} className="text-gray-900 dark:text-white" />
        )}
      </motion.button>

      {/* Menu suspenso quando o hamburguer está aberto */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="absolute top-full right-4 mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: -20 }} // Inicia o menu invisível e acima
            animate={{ opacity: 1, y: 0 }} // Animação de fade-in e slide-up
            exit={{ opacity: 0, y: -20 }} // Animação de fade-out e slide-up
            transition={{ duration: 0.3 }}
          >
            <NotificationButton />
            <ThemeToggle />
            <AccountMenu />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
