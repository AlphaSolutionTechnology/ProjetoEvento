import React, { useState, useEffect } from "react";
import Tabs from "../components/events/Tabs";
import EventCard from "../components/events/eventCard"; // Corrigido o nome do arquivo para consistência
import useEvents from "../hooks/useEvents";

const EventsPage = () => {
  const { events = [], participateInEvent } = useEvents(); // Garante que `events` nunca seja undefined
  const [activeTab, setActiveTab] = useState("geral");
  const [loading, setLoading] = useState(true);

  // Garante que events sempre tenha um valor padrão e previne erro caso não tenha participantes
  const safeEvents = events.map((event) => ({
    ...event,
    participants: event.participants || [], // Garante que participants não seja undefined
  }));

  const filteredEvents =
    activeTab === "geral"
      ? safeEvents.filter((event) => !event.participating)
      : safeEvents.filter((event) => event.participating);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Exibe Skeleton Loader enquanto carrega */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg p-4 animate-pulse"
              >
                <div className="bg-gray-400 dark:bg-gray-600 w-full h-48 mb-4 rounded"></div>
                <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-2/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onParticipate={participateInEvent}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
                Nenhum evento disponível.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
