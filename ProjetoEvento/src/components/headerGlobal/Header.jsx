import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NotificationButton from '../notification/NotificationButton';
import ThemeToggle from '../ThemeToggle';
import AccountMenu from '../AccountMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/home');
  };

  return (
    <header className="p-4 flex justify-between items-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-lg shadow-lg relative">
      <h1
        onClick={handleNavigateHome}
        className="text-2xl font-bold cursor-pointer"
      >
        Home
      </h1>

      {/* Ícones em telas grandes */}
      <div className="hidden md:flex items-center gap-4">
        <NotificationButton />
        <ThemeToggle />
        <AccountMenu />
      </div>

      {/* Menu Hamburguer para telas pequenas */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu suspenso quando hamburguer está aberto */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex flex-row items-center gap-4">
          <NotificationButton />
          <ThemeToggle />
          <AccountMenu />
        </div>
      )}
    </header>
  );
};

export default Header;
