import { useEffect, useState } from "react";
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';


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
            setFormData({ tema: ''}); // Limpa o formulário
          } else {
            console.error('Erro ao criar palestra:', response.statusText);
            alert("Erro ao criar palestra")
          }
        } catch (err) {
          console.error('Erro na requisição:', err.message);
        }
      };
    


      const handlePalestrasList = async () => {

        try{

            const response = await fetch("http://localhost:8080/api/palestra/lista", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                const list = await response.json();
                console.log("Lista de palestras:", list);
                const updatedList = list.map((palestra) => ({
                    ...palestra,
                    checked: false, // Inicialize a propriedade 'checked'
                }));
                setPalestras(updatedList); // Atualiza o estado com a lista recebida
            } else {
                console.error("Erro ao buscar palestras:", response.statusText);
            }
        } catch (err) {
            console.error("Erro na requisição:", err.message);
        }
      };

      useEffect(() => {
        handlePalestrasList();
      }, [])



      

  const handleChange = (id) => {
    setPalestras((prevPalestras) =>
        prevPalestras.map((palestra) =>
            palestra.id === id ? { ...palestra, checked: !palestra.checked } : palestra
        )
    );

  };


  const [showCheckBoxes, setShowCheckBoxes] = useState(false);

  const toggleShowCheckBoxes = () => {

    if (showCheckBoxes) {

        const confirmDelete = window.confirm("Tem certeza que deseja excluir as palestras selecionadas?");
        if (confirmDelete) {
          handleDelete();
          setShowCheckBoxes(false);
        }

      } else {
    
        setPalestras(prevPalestras =>
          prevPalestras.map(palestra => ({ ...palestra, checked: false }))
        );
        setShowCheckBoxes(true);

      }

  }

  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    setCheckedCount(palestras.filter(palestra => palestra.checked).length);
  }, [palestras]);




  const handleDelete = async () => {

    const palestrasToDelete = palestras.filter(palestra => palestra.checked);

    if (palestrasToDelete.length === 0) {
        alert("Nenhuma palestra selecionada para excluir.");
        return;
    }

    const idsToDelete = palestrasToDelete.map(palestra => palestra.id);

    try {

        const response = await fetch("http://localhost:8080/api/palestra/excluir", {
            method: 'DELETE',
            headers:
            {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ids: idsToDelete})
        })

        if (response.ok) {
            console.log('Palestras excluídas com sucesso');
            setPalestras(prevPalestras => prevPalestras.filter(palestra => !palestra.checked));
        } else {
            console.error('Erro ao excluir palestras:', response.statusText);
            alert("Erro ao excluir palestras");
        }



    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }


  }

    const toggleVisibility = (e) => {
        const originEvent = e.target.id;
        if(isVisible && originEvent == 'criarButton'){
            return
        } else {
            setIsVisible(!isVisible);
        }

    }



    return(   
        <>
            <body className="bg-white flex-col p-2">
            
                <h1 className="bg-transparent text-black text-center text-3xl ">PALESTRAS</h1>
               
                <div className="w-full flex-col bg-transparent mt-2 mb-2 p-2">
                   
                    <div className="bg-transparent flex justify-between">
                        <button className="bg-blue-600 text-white rounded-lg p-2 font-bold " id='criarButton' onClick={toggleVisibility}>Criar</button>
                        <button className="bg-red-600 text-white rounded-lg p-2 font-bold " id="excluirButton" onClick={toggleShowCheckBoxes}>Excluir {showCheckBoxes && `(${checkedCount})`}</button>
                    </div>
                   
                    <form onSubmit={handleSubmit} className={isVisible? "bg-transparent items-center" : "hidden"}>
                        <label htmlFor="lectureName" className="mr-2">Tema da palestra:</label>
                        <input type="text" id="lectureName" name="tema" placeholder="Ex.: tema saúde..." className="rounded pl-1 border border-black" value={formData.tema} onChange={formHandleChange} required/>           
                        <button type='submit' className=" p-2 rounded-lg ml-2 bg-green-600 text-white m-1">Confirmar</button>
                        <button type='button' className=" p-2 rounded-lg ml-2 bg-red-700 text-white m-1" onClick={toggleVisibility}>Cancelar</button>
                    </form>

               </div>


                <div id='listContainer' className="bg-transparent w-full h-[50vh] flex-col overflow-y-auto">

                {palestras.map((palestra) => (
                    
                    <div key={palestra.id} className="text-black bg-transparent h-1/6 p-2 flex items-center border-t border-black cursor-pointer relative hover:bg-gray-300" >

                        { showCheckBoxes && (
                            <Checkbox
                            checked={palestra.checked}
                            onChange={() => handleChange(palestra.id)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            className="hidden"
                            />
                        )}
                        <p>{palestra.tema}</p>
                        <button className=" rounded-lg p-2 border-black right-3 absolute bg-gray-600 text-white font-bold">Editar</button>
                    </div>
                ))}


                </div>          
            </body>
        </>
    )

}


export default Palestras;