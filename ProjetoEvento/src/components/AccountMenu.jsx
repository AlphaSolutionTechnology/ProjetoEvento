import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false); 
  const menuRef = useRef(null); 
  const iconRef = useRef(null); 
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClick = () => {
    setIsOpen((prev) => !prev); 
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const goTo = () => {
    navigate("/conectar");
    handleClose();
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) && 
      iconRef.current &&
      !iconRef.current.contains(event.target) 
    ) {
      handleClose(); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick} 
        ref={iconRef} 
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="account-menu"
        aria-label="Abrir menu de conta"
        className="p-2 rounded-full bg-transparent border-2 border-gray-400 dark:border-gray-600 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <User size={32} />
      </motion.button>


      {isOpen && (
        <motion.div
          id="account-menu"
          ref={menuRef} 
          className="absolute right-0 mt-2 w-48 rounded-lg bg-white bg-opacity-10 backdrop-blur-md shadow-lg dark:bg-gray-800 dark:bg-opacity-60 dark:text-gray-200 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="py-2 text-sm">
            <li>
              <button
                onClick={goTo}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                aria-label="Ir para o perfil"
              >
                <User size={20} className="mr-2" />
                Perfil
              </button>
            </li>
            <li>
              <button
                onClick={handleClose}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                aria-label="Minhas conexões"
              >
                <Users size={20} className="mr-2" />
                Minhas Conexões
              </button>
            </li>
            <li>
              <hr className="my-1 border-gray-500 dark:border-gray-600" />
            </li>
            <li>
            <button
              onClick={async () => {
                await logout(); 
                navigate("/login");
              }}
              className="flex items-center px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
              aria-label="Sair"
            >
              <LogOut size={20} className="mr-2" />
              Sair
            </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
