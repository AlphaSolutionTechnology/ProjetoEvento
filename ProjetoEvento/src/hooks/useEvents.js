import { useState, useEffect, useCallback } from "react";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NETWORK_API_LINK}/api/event/event-list`,
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
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const fetchParticipants = useCallback(async (eventId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/event/participants/${eventId}`,
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
      return participants;
    } catch (err) {
      console.error("Erro ao buscar participantes:", err);
      return [];
    }
  }, []);

  const participateInEvent = useCallback(async (eventId, userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/event/subscribe`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId, userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao inscrever no evento: ${response.status}`);
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.idEvento === eventId
            ? {
                ...event,
                participating: true,
                participants: [...(event.participants || []), { id: userId }],
              }
            : event
        )
      );
      return await response.json();
    } catch (err) {
      console.error("Erro ao inscrever no evento:", err);
      throw err;
    }
  }, []);

  return { events, loading, error, fetchParticipants, participateInEvent };
};

export default useEvents;