import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuizzesPage(){

    const navigate = useNavigate();
    const [quizzes, SetQuizzes] = useState([]);

    const {idPalestra} = useParams();

    const handleQuizzes = async () => {

        const response = await fetch('')



    }


    return(
        <>

            <button onClick={() => navigate(`/ranking/${idPalestra}`)}>
                ver ranking
            </button>
                    
        </>
    )
}


export default QuizzesPage;