// src/components/EventCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, onParticipate }) => {
  const currentUser = {
    name: 'Novo Usuário', // Nome do usuário atual
    avatarSeed: 'user123', // Semente do avatar do usuário atual
  };
  const navigate = useNavigate(); 

  // Função para gerar um avatar com base na semente
  const generateAvatar = (seed) => {
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
  };

  // Adiciona o usuário atual à lista de participantes, se não estiver lá
  const updatedParticipants = event.participants.some(p => p.name === currentUser.name)
    ? event.participants
    : [...event.participants, currentUser];

  // Limita a exibição a 3 participantes e calcula o número de participantes restantes
  const visibleParticipants = updatedParticipants.slice(0, 3);
  const remainingParticipants = updatedParticipants.length - 3;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700 transform transition-all duration-300 hover:scale-105"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'smooth', stiffness: 100 }}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {event.description}
        </p>
        <div className="flex items-center justify-between mt-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Exibe os avatares dos participantes */}
            <div className="flex -space-x-2 overflow-hidden">
              {visibleParticipants.map((participant, index) => (
                <img
                  key={index}
                  src={generateAvatar(participant.avatarSeed)}
                  alt={participant.name}
                  title={participant.name}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 hover:border-blue-500 transition-all duration-300"
                />
              ))}
            </div>
            {/* Exibe o número de participantes restantes, se houver */}
            {remainingParticipants > 0 && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                e mais {remainingParticipants} participantes...
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            onParticipate(event.id, currentUser);
            navigate(`/eventosPalestras`);
            
          }}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          <Ticket className="w-5 h-5" />
          <span className="font-semibold">Participar</span>
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;
