import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Função para buscar dados do backend
const fetchEventData = async (endpoint) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_LOCAL_API_LINK}${endpoint}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Erro ao buscar ${endpoint}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

const EventLectures = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [lectures, setLectures] = useState([]);
  const [eventProgress, setEventProgress] = useState({
    totalLectures: 0,
    completedLectures: 0,
    userXP: 0,
    leaderboard: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      // Busca palestras específicas do evento
      const lecturesData = await fetchEventData(`/api/palestra/lecturelist`);
      if (lecturesData) {
        const mappedLectures = lecturesData.map((lecture) => ({
          id: lecture.id,
          title: lecture.title,
          speaker: lecture.speaker,
          time: lecture.time,
          quizLink: lecture.quizLink || `/quiz/${lecture.id}`,
        }));
        setLectures(mappedLectures);
      } else {
        setError("Erro ao carregar palestras");
      }

      // Temporary progress data
      setEventProgress({
        totalLectures: lecturesData ? lecturesData.length : 0,
        completedLectures: 0,
        userXP: 0,
        leaderboard: [],
      });

      setLoading(false);
    };

    loadData();
  }, [eventId]);

  if (loading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </motion.main>
    );
  }

  if (error) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/eventos")}
          aria-label="Voltar"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Voltar</span>
        </button>

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Palestras do Evento {eventId}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete palestras e acesse os quizzes!
          </p>
        </header>

        <section className="mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Seu Progresso
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                      width: `${
                        eventProgress.totalLectures
                          ? (eventProgress.completedLectures /
                              eventProgress.totalLectures) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {eventProgress.completedLectures}/
                  {eventProgress.totalLectures} palestras concluídas
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Palestras Disponíveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <motion.article
                  key={lecture.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {lecture.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-semibold">Palestrante:</span>{" "}
                    {lecture.speaker}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <span className="font-semibold">Horário:</span>{" "}
                    {lecture.time}
                  </p>
                  <button
                    onClick={() => navigate(lecture.quizLink)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                  >
                    <span>Fazer Quiz</span>
                    <ArrowLeft className="w-5 h-5 transform rotate-180" />
                  </button>
                </motion.article>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Nenhuma palestra disponível para este evento.
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ranking do Evento
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Ranking em desenvolvimento.
            </p>
          </div>
        </section>
      </div>
    </motion.main>
  );
};

export default EventLectures;
