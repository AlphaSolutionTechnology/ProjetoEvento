import { useEffect, useState, useRef } from "react";

function AnswerTimer({ durationInMinutes = 1, onTimeUp }) {
  // Converte minutos para segundos
  const durationInSeconds = durationInMinutes * 60;

  const [counter, setCounter] = useState(0); // Contador em segundos
  const [progressLoaded, setProgressLoaded] = useState(0); // Progresso da barra em %

  const intervalRef = useRef(null); // Referência para o intervalo

  useEffect(() => {
    // Inicia o intervalo para incrementar o contador a cada segundo
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    // Limpa o intervalo ao desmontar
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // Atualiza o progresso da barra (de 0 a 100)
    setProgressLoaded((100 * counter) / durationInSeconds);

    // Verifica se o tempo acabou
    if (counter >= durationInSeconds) {
      clearInterval(intervalRef.current); // Para o intervalo

      // Executa o callback, se fornecido
      setTimeout(() => {
        if (onTimeUp) onTimeUp();
      }, 0);
    }
  }, [counter, durationInSeconds, onTimeUp]);

  return (
    <div className="w-full h-4 bg-gray-300 rounded-lg overflow-hidden">
      <div
        className={`h-full transition-all ${
          progressLoaded > 80 ? "bg-red-500" : "bg-green-500"
        }`}
        style={{ width: `${progressLoaded}%` }}
      />
    </div>
  );
}

export default AnswerTimer;
