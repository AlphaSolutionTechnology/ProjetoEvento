import { dividerClasses } from "@mui/material";
import { useState } from "react";

function Palestras(){

    const [lectureName, setLectureName] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const createLecture = () => {

        fetch
     

    }





    const toggleVisibility = () => {

        setIsVisible(!isVisible);

    }



    return(   
        <>
            <body className="bg-red-200 flex-col p-2">
            
                <h1 className="bg-blue-200 text-black text-center">Palestras</h1>
               
                <div className="w-full flex-col bg-green-100 mt-2 mb-2 p-2">
                   
                    <div className="bg-purple-400 flex justify-between">
                        <button onClick={toggleVisibility}>Criar</button>
                        <button>Excluir</button>
                    </div>
                   
                    <form className={isVisible? "bg-amber-700 items-center" : "hidden"}>
                        <label htmlFor="lectureName" className="mr-2"> Nome da palestra:</label>
                        <input type="text" id="lectureName" className="rounded pl-1" value={lectureName} onChange={(e) => (setLectureName(e.target.value))}/>           
                        <button type='button' className="border-black border p-1 rounded-lg ml-2" onClick={createLecture}>Confirmar</button>
                        <button type='button' className="border-black border p-1 rounded-lg ml-2" onClick={toggleVisibility}>Cancelar</button>
                    </form>

               </div>


                <div id='listContainer' className="bg-yellow-50 w-full h-[50vh] border-t border-black flex-col overflow-y-auto">

                {lectures.map((lecture) => (

                    <div key={lecture.key} className="text-black bg-yellow-400 h-1/6 p-2 flex items-center justify-between ">
                        <p>{lecture.name}</p>
                        <button className="bg-transparent border-black text-black">Editar</button>
                    </div>
                ))}


                </div>          
            </body>
        </>
    )

}


export default Palestras;