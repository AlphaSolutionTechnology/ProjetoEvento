import './AnswerTimer.css';
import { useEffect, useState, useRef } from 'react';

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
    <div className="answer-timer-container">
      <div
        className={`progress ${progressLoaded > 80 ? 'warning' : ''}`}
        style={{ width: `${progressLoaded}%` }}
      ></div>
    </div>
  );
}

export default AnswerTimer;
