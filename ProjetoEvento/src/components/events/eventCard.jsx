import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEvents from "../../hooks/useEvents";

const EventCard = ({ event, onParticipate, onTabChange }) => {
  const navigate = useNavigate();
  const { fetchParticipants } = useEvents();
  const [participants, setParticipants] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log(`Rendering EventCard for event ${event.idEvento}`); // Debugging

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedParticipants = await fetchParticipants(event.idEvento);
      console.log("Fetched participants:", fetchedParticipants); 
      setParticipants(fetchedParticipants || []);

      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          console.log("Parsed user:", user); // Debugging
          if (user.id && fetchedParticipants) {
            setIsEnrolled(fetchedParticipants.some((p) => p.idUser === user.id));
          }
        } catch (error) {
          console.error("Error parsing user_data:", error);
        }
      }
    } catch (error) {
      console.error("Error in loadData:", error);
      setParticipants([]);
      setIsEnrolled(false);
    } finally {
      setIsLoading(false);
    }
  }, [event.idEvento, fetchParticipants]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const subscribeEvent = async () => {
    try {
      setIsLoading(true);
      const userData = localStorage.getItem("user_data");
      if (!userData) {
        console.error("Usuário não autenticado");
        return;
      }
      const user = JSON.parse(userData);

      await onParticipate(event.idEvento, user.id);

      setIsEnrolled(true);

      const updatedParticipants = await fetchParticipants(event.idEvento);
      setParticipants(updatedParticipants || []);

      if (onTabChange) {
        onTabChange("participando");
      }
    } catch (error) {
      console.error("Erro ao inscrever no evento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700 transform transition-all duration-300 hover:scale-105"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "smooth", stiffness: 100 }}
    >
      <img
        src="https://via.placeholder.com/400"
        alt={event.nome}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {event.nome}
        </h3>

        <div className="flex items-center justify-between mt-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Data não informada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              {participants.slice(0, 3).map((participant, index) => (
                <div
                  key={index}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800 bg-blue-500 text-white text-xs font-bold"
                  title={participant.name}
                >
                  {participant.name[0].toUpperCase()}
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
          onClick={isEnrolled ? () => navigate(`/eventosPalestras`) : subscribeEvent}
          disabled={isLoading}
          className={`mt-6 w-full text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            isEnrolled
              ? "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Ticket className="w-5 h-5" />
          <span className="font-semibold">
            {isLoading ? "Carregando..." : isEnrolled ? "Entrar" : "Participar"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;