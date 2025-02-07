import { useEffect, useState, useRef } from "react";

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0); // Contador de tempo
  const [progressLoaded, setProgressLoaded] = useState(0); // Progresso da barra
  const intervalRef = useRef(null); // Referência para o intervalo

  useEffect(() => {
    // Inicia o intervalo para incrementar o contador
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar
  }, []);

  useEffect(() => {
    // Atualiza o progresso da barra
    setProgressLoaded((100 * counter) / duration);

    // Verifica se o tempo acabou
    if (counter >= duration) {
      clearInterval(intervalRef.current); // Para o intervalo

      setTimeout(() => {
        if (onTimeUp) onTimeUp(); // Chama a função de callback, se fornecida
      }, 0);
    }
  }, [counter, duration, onTimeUp]);

  return (
    <div className="w-full h-4 bg-gray-300 rounded-lg overflow-hidden">
      <div
        className={`h-full transition-all ${
          progressLoaded > 80 ? "bg-red-500" : "bg-green-500"
        }`}
        style={{ width: `${progressLoaded}%` }}
      ></div>
    </div>
  );
}

export default AnswerTimer;
