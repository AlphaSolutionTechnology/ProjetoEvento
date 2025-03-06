import { useState, useEffect } from "react";

const useInscricao = (idPalestra) => {
  const [isInscrito, setIsInscrito] = useState(null);

  useEffect(() => {
    const verificarInscricao = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NETWORK_API_LINK}
/api/palestra/verificarPalestra/${idPalestra}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsInscrito(data.inscrito);
        } else {
          setIsInscrito(false);
        }
      } catch (error) {
        console.error("Erro ao verificar inscrição:", error);
        setIsInscrito(false);
      }
    };

    verificarInscricao();
  }, [idPalestra]);

  return isInscrito;
};

export default useInscricao;
