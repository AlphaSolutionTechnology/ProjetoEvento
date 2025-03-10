import { Navigate, useParams } from "react-router-dom";
import useQuizz from "../hooks/useQuizz";
import Loading from "./loading/loading";
import QuizIsDone from "./QuizzIsDone";
import { useState, useEffect } from "react";

const ProtectedRouteQuizz = ({ children }) => {
  const { idPalestra } = useParams();
  const isDone = useQuizz(idPalestra);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleClose = () => {
    setQuizFinished(false);
  };

  useEffect(() => {
    if (isDone) {
      setQuizFinished(true);
    }
  }, [isDone]); 

  if (isDone === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (quizFinished) {
    return <QuizIsDone onClose={handleClose} />;
  }

  return children;
};

export default ProtectedRouteQuizz;
