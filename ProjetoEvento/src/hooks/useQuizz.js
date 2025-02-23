import { useState, useEffect } from "react";

const useQuizz = (idPalestra) => {
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const verificarStatus = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_LOCAL_API_LINK}/api/questoes/verificarStatus/${idPalestra}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setIsDone(data.quizzStatus === "Concluído"); 
                } else {
                    console.error("Erro ao obter status do quiz:", response.status);
                }
            } catch (error) {
                console.error("Erro ao verificar status da questão:", error);
            }
        };

        verificarStatus();
    }, [idPalestra]); 

    return isDone;
};

export default useQuizz;
