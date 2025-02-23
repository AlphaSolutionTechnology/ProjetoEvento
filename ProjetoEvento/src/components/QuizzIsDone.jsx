import { useNavigate, useParams } from "react-router-dom"


const QuizIsDone = ({onClose}) => {

    const {idPalestra} = useParams();

    const navigate = useNavigate();


    return (
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg text-center w-80">
        <h2 className="text-2xl font-semibold mb-4">Quiz Concluído!</h2>
        <p className="text-lg mb-6">Você já completou o quiz. Parabéns!</p>
        <div className="flex justify-between space-x-4">
          <button
            className="w-1/2 py-2 px-4 bg-green-500 text-white rounded-lg transition-colors hover:bg-green-600"
            onClick={() => {navigate(`/palestra/${idPalestra}`)}}
          >
            Fechar
          </button>
          <button
            className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-600"
            onClick={() => navigate('/ranking')}
          >
            Ver Ranking
          </button>
        </div>
      </div>
    </div>
        </>
    )
}


export default QuizIsDone;