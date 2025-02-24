import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, LogOut } from "lucide-react";

const PROGRESS_COLORS = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-600 animate-pulse",
};

const ANIMATION_DURATION = 0.5;

const QuizHeader = ({ currentQuestion, totalQuestions, durationInMinutes = 1, onTimeUp }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const durationInSeconds = durationInMinutes * 60;
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef(null);

  const handleTimeUp = useCallback(() => {
    if (onTimeUp) {
      onTimeUp();
    }
  }, [onTimeUp]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (counter >= durationInSeconds) {
      clearInterval(intervalRef.current);
      handleTimeUp();
    }
    setProgressLoaded((100 * counter) / durationInSeconds);
  }, [counter, durationInSeconds, handleTimeUp]);

  const getProgressColor = () => {
    if (progressLoaded > 80) return PROGRESS_COLORS.high;
    if (progressLoaded > 50) return PROGRESS_COLORS.medium;
    return PROGRESS_COLORS.low;
  };

  const handleQuit = () => {
    setShowModal(false);
    navigate(-1);
  };

  return (
    <>
      <header className="flex flex-col p-6 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl shadow-2xl relative">
        {/* Seção do botão de desistência */}
        <section className="flex justify-start p-2">
          <button
            onClick={() => setShowModal(true)}
            className="p-3 text-white bg-red-500 rounded-full hover:bg-red-700 transition text-lg font-semibold flex items-center gap-2"
          >
            <X size={20} />
            <span>Sair do Quiz</span>
          </button>
        </section>

        {/* Seção da contagem de perguntas e barra de progresso */}
        <section className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <span className="bg-white/10 p-3 rounded-lg shadow-sm">{currentQuestion + 1}</span>
            <span className="text-teal-200">/{totalQuestions}</span>
          </div>

          <motion.div
            className="w-full sm:w-48 h-3 bg-gray-800 rounded-full overflow-hidden relative"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: ANIMATION_DURATION }}
          >
            <motion.div
              className={`h-full rounded-full transition-all duration-500 ease-in-out ${getProgressColor()}`}
              style={{ width: `${progressLoaded}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progressLoaded}%` }}
            />
          </motion.div>

        </section>

        {/* Alerta "Acelere!" */}
        {progressLoaded > 80 && (
          <motion.div
            className="absolute top-16 right-4 flex items-center space-x-2 p-2 bg-red-600 text-white rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: ANIMATION_DURATION }}
          >
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-semibold">Acelere!</span>
          </motion.div>
        )}
      </header>

      {/* Modal de confirmação */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <LogOut className="w-10 h-10 mx-auto text-red-500" />
              <h2 className="text-xl font-semibold mt-4">Deseja desistir do quiz?</h2>
              <p className="text-gray-400 mt-2">Você perderá seu progresso atual.</p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleQuit}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Desistir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizHeader;
