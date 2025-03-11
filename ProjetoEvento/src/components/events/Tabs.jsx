// src/components/Tabs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy } from 'lucide-react'; // Importando ícones do Lucide

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <section className="flex justify-center mb-8">
      <nav>
        <ul className="flex space-x-8">
          <li className="flex-1"> {/* Adicionado flex-1 para garantir tamanho igual */}
            <motion.button
              onClick={() => onTabChange('geral')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-full px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'geral'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Calendar className="w-6 h-6" /> {/* Ícone do Lucide */}
              <span className="font-semibold text-lg">Eventos</span>
              {activeTab === 'geral' && (
                <motion.span
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </li>
          <li className="flex-1"> {/* Adicionado flex-1 para garantir tamanho igual */}
            <motion.button
              onClick={() => onTabChange('participando')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-full px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'participando'
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Trophy className="w-6 h-6" /> {/* Ícone do Lucide */}
              <span className="font-semibold text-lg">Participando</span>
              {activeTab === 'participando' && (
                <motion.span
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Tabs;