
import { useEffect, useState } from "react";
import CreateQuestoes from "../components/createquestoes";
import { useLocation } from "react-router-dom";
import Loading from "../components/loading/loading";




function AdmQuizz(){

const [questoes, setQuestoes] = useState([]);
const [palestraId, setPalestraId] = useState(null);


const location = useLocation();

useEffect(() => {

    const id = location.state?.idPalestra 
    setPalestraId(id || "");

}, [location.search]);


const searchQuestoes = async() => {

    try{

        const response = await fetch(`http://localhost:8080/api/questoes/palestraQuizz?idPalestra=${palestraId}`)
    
        if(response.ok){
            const data = await response.json();
            setQuestoes(data);
        } else {
            throw new Error("Erro ao buscar as questões.")
        }
    } catch (error) {
        console.error("Erro:", error)
    }


}

useEffect(() => {

    if(palestraId){
        searchQuestoes();
    }

}, [palestraId])



return(
    <>
        <body className="flex flex-col bg-gray-100 items-center">
            

            <div className="flex flex-col w-[100%] items-center gap-4 bg-gray-100">


            <h1 className="my-6 text-3xl">Quizzes da palestra</h1>
         
            
            {questoes.length == 0 ? 
            <p>Nnehuma questão encontrada.</p> 
            :
            (questoes.map((questao) => (
            <div key={questao.id} className="flex flex-col p-5 gap-8 w-[70%]  rounded shadow-md z-10 bg-white ">

        
                <p className="text-center">{questao.enunciado}</p>
               

                <div className="flex flex-col gap-5">
                     {questao.choices.map((choice, index) => (
                        <div key={index} className="text-center border border-gray-300 p-2 shadow-sm rounded-md">{choice}</div>
                     ))}
                </div>
                <p>Resposta correta: {questao.correctAnswer}</p>
            </div>
            )))}

            </div>

            <CreateQuestoes/>

        </body>    
    </>
)





}





































export default AdmQuizz;