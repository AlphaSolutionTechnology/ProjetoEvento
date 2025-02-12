import { useState } from "react";

function MeusCadastros(){
    const [palestras, setPalestras] = useState([]);

    const handlePalestrasList = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/palestra/lista", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            const list = await response.json();
            setPalestras(list);
          } else {
            console.error("Erro ao buscar palestras:", response.statusText);
          }
        } catch (err) {
          console.error("Erro na requisição:", err.message);
        }
      };

      useEffect(() => {
          handlePalestrasList();
        }, []);




    return(
        <>

            <List/>
        </>
    )
}



export default MeusCadastros;