import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEvents from "../../hooks/useEvents"; // Importa o hook atualizado

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { fetchParticipants } = useEvents();
  const [participants, setParticipants] = useState([]); // Estado para armazenar os participantes

  useEffect(() => {
    // Busca os participantes reais ao montar o componente
    const loadParticipants = async () => {
      const fetchedParticipants = await fetchParticipants(event.id);
      setParticipants(fetchedParticipants);
    };

    loadParticipants();
  }, [event.id, fetchParticipants]);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700 transform transition-all duration-300 hover:scale-105"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "smooth", stiffness: 100 }}
    >
      <img
        src={"https://via.placeholder.com/400"} // Imagem fictícia, pois eventos não têm imagem
        alt={event.nome}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {event.nome}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">ID do evento: {event.id}</p>
        <div className="flex items-center justify-between mt-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Data não informada</span> {/* Como o evento não tem data */}
          </div>
          <div className="flex items-center gap-2">
            {/* Exibe os participantes reais */}
            <div className="flex -space-x-2 overflow-hidden">
              {participants.slice(0, 3).map((participant, index) => (
                <div
                  key={index}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800 bg-blue-500 text-white text-xs font-bold"
                  title={participant} // Exibe o nome do participante ao passar o mouse
                >
                  {participant[0].toUpperCase()} {/* Primeira letra do nome como avatar */}
                </div>
              ))}
            </div>
            {participants.length > 3 && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                e mais {participants.length - 3} participantes...
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate(`/eventosPalestras`)}
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
