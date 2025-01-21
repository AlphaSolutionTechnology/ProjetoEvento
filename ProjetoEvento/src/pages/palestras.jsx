import { dividerClasses } from "@mui/material";
import { useState } from "react";

function Palestras(){

    const [palestras, setPalestras] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        tema:'',
        evento: {
            id: "1",
            nome:"Primeiro Evento",
            data: "2025-03-25"
        }
    })


    const formHandleChange = (e) => {

        const { name, value } = e.target
        setFormData( prevState => ({
            ...prevState,
            [name]: value,
        }));

    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        const createPalestra = {
            ...formData
        };

        try{

        const response = await fetch("http://localhost:8080/api/palestra/criar", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(createPalestra),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Palestra criada:', data);
            setPalestras(prevPalestras => [...prevPalestras, data]);
            setFormData({ titulo: '', descricao: '', palestrante: '' }); // Limpa o formulário
          } else {
            console.error('Erro ao criar palestra:', response.statusText);
          }
        } catch (err) {
          console.error('Erro na requisição:', err.message);
        }
      };
    









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
                   
                    <form onSubmit={handleSubmit} className={isVisible? "bg-amber-700 items-center" : "hidden"}>
                        <label htmlFor="lectureName" className="mr-2">Tema da palestra:</label>
                        <input type="text" id="lectureName" name="tema" className="rounded pl-1" value={formData.tema} onChange={formHandleChange}/>           
                        <button type='submit' className="border-black border p-1 rounded-lg ml-2">Confirmar</button>
                        <button type='button' className="border-black border p-1 rounded-lg ml-2" onClick={toggleVisibility}>Cancelar</button>
                    </form>

               </div>


                <div id='listContainer' className="bg-yellow-50 w-full h-[50vh] border-t border-black flex-col overflow-y-auto">

                {palestras.map((palestra) => (

                    <div key={palestra.id} className="text-black bg-yellow-400 h-1/6 p-2 flex items-center justify-between ">
                        <p>{palestra.tema}</p>
                        <button className="bg-transparent border-black text-black">Editar</button>
                    </div>
                ))}


                </div>          
            </body>
        </>
    )

}


export default Palestras;