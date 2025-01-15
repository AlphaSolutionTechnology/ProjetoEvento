import { jsQuizz } from '../components/Quiz/Constants';
import Quiz from "../components/Quiz/quizz";


function QuestoesView() {
  return <Quiz questions={jsQuizz.questions} />;
}

export default QuestoesView;
