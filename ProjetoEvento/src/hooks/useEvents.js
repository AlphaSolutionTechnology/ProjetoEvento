// src/hooks/useEvents.js
import { useState } from 'react';

const useEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Evento de Tecnologia',
      description: 'Um evento incrível sobre as últimas tendências em tecnologia.',
      image: 'https://via.placeholder.com/400',
      date: '25/10/2049',
      participants: [
        { name: 'João Silva', avatar: 'https://via.placeholder.com/40' },
        { name: 'Maria Souza', avatar: 'https://via.placeholder.com/40' },
        { name: 'Carlos Oliveira', avatar: 'https://via.placeholder.com/40' },
        { name: 'Ana Costa', avatar: 'https://via.placeholder.com/40' },
        { name: 'Pedro Rocha', avatar: 'https://via.placeholder.com/40' },
      ],
      lectures: [], // Adicionando palestras ao evento
    },
    {
      id: 2,
      title: 'Workshop de Design',
      description: 'Aprenda técnicas avançadas de design com profissionais experientes.',
      image: 'https://via.placeholder.com/400',
      date: '30/10/2049',
      participants: [
        { name: 'Ana Costa', avatar: 'https://via.placeholder.com/40' },
        { name: 'Pedro Rocha', avatar: 'https://via.placeholder.com/40' },
      ],
      lectures: [], // Adicionando palestras ao evento
    },
  ]);

  // Função para criar um novo evento
  const createEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: events.length + 1, // Gera um ID único
      participants: [], // Inicializa sem participantes
      lectures: [], // Inicializa sem palestras
    };
    setEvents([...events, eventWithId]);
  };

  // Função para adicionar uma palestra a um evento existente
  const addLectureToEvent = (eventId, newLecture) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              lectures: [...event.lectures, newLecture], // Adiciona a nova palestra
            }
          : event
      )
    );
  };

  // Função para permitir que um usuário participe de um evento
  const participateInEvent = (eventId, user) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              participants: [...event.participants, user], // Adiciona o novo participante
            }
          : event
      )
    );
  };

  return { events, createEvent, addLectureToEvent, participateInEvent };
};

export default useEvents;