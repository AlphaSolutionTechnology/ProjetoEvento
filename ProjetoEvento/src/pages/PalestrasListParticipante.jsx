import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Ícone de loading (instale lucide-react se ainda não tiver)

function PalestrasListParticipante() {
  const [palestras, setPalestras] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [loadingPalestraId, setLoadingPalestraId] = useState(null); // Controla qual palestra está carregando
  const navigate = useNavigate();

  // Função para buscar a lista de palestras
  const handlePalestrasList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/palestra/lecturelist`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  // Função para validar/increver-se na palestra antes de acessar
  const validarPalestra = async (codigoPalestra, idPalestra) => {
    setLoadingPalestraId(idPalestra); // Inicia o loading para a palestra clicada
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_NETWORK_API_LINK
        }/api/palestra/inscrever/${codigoPalestra}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Palestra não encontrada");

      const data = await response.json();
      const palestraId = data.idPalestra;

      if (!palestraId) throw new Error("ID da Palestra não encontrado!");

      // Armazena o ID da palestra no localStorage
      localStorage.setItem("palestraAtual", palestraId);

      setToastType("success");
      setToastMessage("Inscrição realizada com sucesso!");
      setToastOpen(true);

      // Redireciona para a página da palestra após 2 segundos
      setTimeout(() => {
        navigate(`/palestra/${palestraId}`);
      }, 2000);
    } catch (error) {
      setToastType("error");
      setToastMessage(
        "Erro ao se inscrever na palestra. Verifique o código ou tente novamente."
      );
      setToastOpen(true);
    } finally {
      setLoadingPalestraId(null); // Finaliza o loading, independentemente do resultado
    }
  };

  // Função chamada ao clicar na palestra
  const goToPalestra = (palestra) => {
    if (loadingPalestraId) return; // Impede cliques adicionais enquanto há um loading ativo
    validarPalestra(palestra.uniqueCode, palestra.id);
  };

  // Carrega as palestras ao montar o componente
  useEffect(() => {
    handlePalestrasList();
  }, []);

  return (
    <div className="min-h-screen p-6 text-white dark:bg-[#0d1117]">
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 sm:text-3xl md:text-4xl lg:text-4xl">
        Palestras do Evento
      </h1>

      {/* Lista de palestras */}
      <div className="space-y-4">
        {/* Exibe mensagem caso não haja palestras */}
        {palestras.length === 0 ? (
          <p className="text-center text-gray-400">
            Nenhuma palestra encontrada.
          </p>
        ) : (
          // Mapeia todas as palestras e exibe cada uma
          palestras.map((palestra) => (
            <motion.div
              key={palestra.id}
              whileHover={{ scale: loadingPalestraId === palestra.id ? 1 : 1.02 }} // Desativa hover durante loading
              className={`flex justify-between items-center dark:bg-gray-900 dark:text-white p-6 rounded-xl shadow-md relative ${
                loadingPalestraId === palestra.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } text-sm sm:text-base md:text-lg lg:text-base xl:text-lg max-w-xl w-full mx-auto`}
              onClick={() => goToPalestra(palestra)} // Chama a função ao clicar
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-black dark:text-white flex-1">
                {palestra.tema}
              </p>
              {loadingPalestraId === palestra.id && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute right-4"
                >
                  <Loader2 size={24} className="text-blue-500" />
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Toast para feedback */}
      {toastOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toastMessage}
        </motion.div>
      )}
    </div>
  );
}

export default PalestrasListParticipante;