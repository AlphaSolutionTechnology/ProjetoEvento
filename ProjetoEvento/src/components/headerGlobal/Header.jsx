import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import NotificationButton from "../notification/NotificationButton";
import ThemeToggle from "../ThemeToggle";
import AccountMenu from "../AccountMenu";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const accountMenuRef = useRef(null);

  const handleNavigateHome = useCallback(() => {
    if (window.location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  }, [navigate]);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (windowWidth >= 768) {
      setMenuOpen(false);
    }
  }, [windowWidth]);

  // Fecha o menu de conta ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-ld rounded-lg relative z-50 bg-opacity-50 backdrop-blur-md dark:bg-opacity-60">
      <h1
        onClick={handleNavigateHome}
        className="text-xl font-bold cursor-pointer text-gray-900 dark:text-white hover:text-blue-500 transition-colors"
      >
        Home
      </h1>

      <nav className="flex items-center gap-4">
        <NotificationButton />
        <ThemeToggle />

        {/* Ícone de usuário para abrir menu */}
        {windowWidth >= 768 ? (
          <div className="relative" ref={accountMenuRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            >
              <UserCircle size={28} className="text-gray-900 dark:text-white" />
            </button>
            <AnimatePresence>
              {accountMenuOpen && (
                <motion.div>
                  <AccountMenu isOpen={true} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir Menu"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? (
              <X size={28} className="text-gray-900 dark:text-white" />
            ) : (
              <Menu size={28} className="text-gray-900 dark:text-white" />
            )}
          </motion.button>
        )}
      </nav>

      <AnimatePresence>
        {menuOpen && windowWidth < 768 && (
          <motion.div className="absolute top-full right-4 mt-2 bg-white dark:bg-gray-800">
            <AccountMenu isOpen={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
