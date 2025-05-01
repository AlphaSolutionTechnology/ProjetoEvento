import { useState, useEffect } from "react";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_LINK}/api/event/getallevents`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar eventos: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data); // Define os eventos com os dados da API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Função para buscar participantes de um evento específico
  const fetchParticipants = async (eventId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOCAL_API_LINK
        }/api/event/getallparticipants/${eventId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar participantes do evento ${eventId}`);
      }

      const participants = await response.json();
      return participants; // Retorna a lista de participantes (somente nomes)
    } catch (err) {
      console.error("Erro ao buscar participantes:", err);
      return [];
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_LINK}/api/event/createevent`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao criar evento: ${response.status}`);
      }

      const data = await response.json();
      return data; // Retorna os dados do evento criado
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      throw err;
    }
  };

  return { events, loading, error, fetchParticipants, createEvent };
};

export default useEvents;


//Teste PR