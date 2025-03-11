// src/pages/EventLectures.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Trophy, Zap, Clock, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dados fictícios de palestras
const lecturesData = {
  1: [
    {
      id: 1,
      title: 'Introdução ao React',
      speaker: 'João Silva',
      time: '10:00',
      difficulty: 'Fácil',
      xp: 100,
      badge: 'https://via.placeholder.com/100.png/09f/fff?text=React', // URL da imagem do badge
      quizLink: '/quiz/', // Link para o quiz da palestra
    },
    {
      id: 2,
      title: 'Tailwind CSS na Prática',
      speaker: 'Maria Souza',
      time: '11:00',
      difficulty: 'Médio',
      xp: 200,
      badge: 'https://via.placeholder.com/100.png/09f/fff?text=Tailwind', // URL da imagem do badge
      quizLink: '/quiz/2', // Link para o quiz da palestra
    },
    {
      id: 3,
      title: 'Animações com Framer Motion',
      speaker: 'Carlos Oliveira',
      time: '12:00',
      difficulty: 'Difícil',
      xp: 300,
      badge: 'https://via.placeholder.com/100.png/09f/fff?text=Motion', // URL da imagem do badge
      quizLink: '/quiz/3', // Link para o quiz da palestra
    },
  ],
  2: [
    {
      id: 4,
      title: 'Desenvolvimento de APIs com Node.js',
      speaker: 'Ana Costa',
      time: '14:00',
      difficulty: 'Médio',
      xp: 200,
      badge: 'https://via.placeholder.com/100.png/09f/fff?text=Node.js', // URL da imagem do badge
      quizLink: '/quiz/4', // Link para o quiz da palestra
    },
    {
      id: 5,
      title: 'Autenticação com JWT',
      speaker: 'Pedro Rocha',
      time: '15:00',
      difficulty: 'Difícil',
      xp: 300,
      badge: 'https://via.placeholder.com/100.png/09f/fff?text=JWT', // URL da imagem do badge
      quizLink: '/quiz/5', // Link para o quiz da palestra
    },
  ],
};

// Dados fictícios de progresso e ranking
const eventProgress = {
  totalLectures: 5,
  completedLectures: 2,
  userXP: 500,
  leaderboard: [
    { name: 'João Silva', xp: 1200 },
    { name: 'Maria Souza', xp: 900 },
    { name: 'Carlos Oliveira', xp: 800 },
  ],
};

const EventLectures = () => {
  const { eventId } = useParams(); // Captura o ID do evento da URL
  const navigate = useNavigate();

  // Busca as palestras do evento com base no ID
  const lectures = lecturesData[1] || [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Botão de voltar */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 mb-8"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Voltar</span>
        </button>

        {/* Título da página */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Palestras do Evento {eventId}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete palestras, ganhe XP, troféus e suba no ranking!
          </p>
        </header>

        {/* Progresso do Evento */}
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
                      width: `${(eventProgress.completedLectures / eventProgress.totalLectures) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {eventProgress.completedLectures}/{eventProgress.totalLectures} palestras concluídas
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  XP Total: <strong>{eventProgress.userXP}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de palestras */}
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
                    <span className="font-semibold">Palestrante:</span> {lecture.speaker}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-semibold">Horário:</span> {lecture.time}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Dificuldade:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        lecture.difficulty === 'Fácil'
                          ? 'bg-green-100 text-green-800'
                          : lecture.difficulty === 'Médio'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {lecture.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Ganhe <strong>{lecture.xp} XP</strong> ao participar!
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-purple-500" />
                    <img
                      src={lecture.badge}                       
                      className="w-8 h-8 rounded-full bg-gray-500"
                    />
                    <span className="text-gray-600 dark:text-gray-400">
                      Ganhe este badge ao completar!
                    </span>
                  </div>
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

        {/* Ranking */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ranking do Evento
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="space-y-4">
              {eventProgress.leaderboard.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Trophy className={`w-6 h-6 ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                        ? 'text-gray-400'
                        : index === 2
                        ? 'text-yellow-800'
                        : 'text-gray-600'
                    }`} />
                    <span className="text-gray-900 dark:text-gray-100">{user.name}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{user.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
};

export default EventLectures;