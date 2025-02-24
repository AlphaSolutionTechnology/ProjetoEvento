import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

// Constantes para cores e durações
const PROGRESS_COLORS = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-600 animate-pulse",
};

const ANIMATION_DURATION = 0.5;

const QuizHeader = ({ currentQuestion, totalQuestions, durationInMinutes = 1, onTimeUp }) => {
  const durationInSeconds = durationInMinutes * 60;
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef(null);

  // Função para finalizar o tempo
  const handleTimeUp = useCallback(() => {
    if (onTimeUp) {
      onTimeUp(); // Chama a função de finalização do quiz
    }
  }, [onTimeUp]);

  // Inicia o contador
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1); // Incrementa o contador a cada segundo
    }, 1000);

    // Limpa o intervalo ao desmontar o componente
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Verifica se o tempo acabou
  useEffect(() => {
    if (counter >= durationInSeconds) {
      clearInterval(intervalRef.current); // Limpa o intervalo
      handleTimeUp(); // Chama a função de finalização
    }
    setProgressLoaded((100 * counter) / durationInSeconds); // Atualiza o progresso
  }, [counter, durationInSeconds, handleTimeUp]);

  // Retorna a cor da barra de progresso com base no tempo restante
  const getProgressColor = () => {
    if (progressLoaded > 80) return PROGRESS_COLORS.high;
    if (progressLoaded > 50) return PROGRESS_COLORS.medium;
    return PROGRESS_COLORS.low;
  };

  return (
    <header className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl shadow-2xl">
      {/* Número da pergunta */}
      <div className="flex items-center gap-2 text-2xl font-bold text-white">
        <span className="bg-white/10 p-3 rounded-lg shadow-sm">{currentQuestion + 1}</span>
        <span className="text-teal-200">/{totalQuestions}</span>
      </div>

      {/* Barra de progresso e alerta */}
      <div className="flex flex-col items-center space-y-4 p-6 relative">
        {/* Barra de progresso */}
        <motion.div
          className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden relative"
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

        {/* Alerta "Acelere!" */}
        {progressLoaded > 80 && (
          <motion.div
            className="absolute -top-2 right-0 flex items-center space-x-2 p-2 bg-red-600 text-white rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: ANIMATION_DURATION }}
          >
            <Zap className="w-5 h-5 animate-ping" />
            <span className="text-sm font-semibold">Acelere!</span>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default QuizHeader;