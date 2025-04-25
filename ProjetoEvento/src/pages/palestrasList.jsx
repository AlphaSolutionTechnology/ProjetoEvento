// Path: ProjetoEvento/src/pages/palestrasList.jsx

import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

function PalestrasList() {
  const [palestras, setPalestras] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    tema: "",
    evento: {
      id: "1",
      nome: "= Evento",
      data: "2025-03-25",
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [palestraToDelete, setPalestraToDelete] = useState(null);

  const navigate = useNavigate();

  const formHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createPalestra = { ...formData };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}
/api/palestra/criar`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createPalestra),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPalestras((prevPalestras) => [...prevPalestras, data]);
        setFormData({
          tema: "",
          evento: {
            id: "1",
            nome: "Primeiro",
            data: "2025-03-25",
          },
        });
      } else {
        alert("Erro ao criar palestra");
      }
    } catch (err) {
      console.error("Erro na requisição:", err.message);
    }
  };

  const handlePalestrasList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}
/api/palestra/lista`,
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

  useEffect(() => {
    handlePalestrasList();
  }, []);

  const handleDeleteSingle = async (id) => {
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_NETWORK_API_LINK}/api/palestra/excluir`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );

        if (response.ok) {
          setPalestras((prevPalestras) =>
            prevPalestras.filter((palestra) => palestra.id !== id)
          );
        } else {
          const errorData = await response.json();
          console.error("Erro ao excluir a palestra:", errorData);
          alert("Erro ao excluir a palestra.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error.message);
      }
    }
  };

  const openDeleteModal = (id) => {
    setPalestraToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPalestraToDelete(null);
  };
  const confirmDelete = async () => {
    if (palestraToDelete) {
      handleDeleteSingle(palestraToDelete);
      closeDeleteModal();
    }
  };

  return (
    <div className="min-h-screen p-6 text-white dark:bg-[#0d1117]">
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 sm:text-3xl md:text-4xl lg:text-4xl">
        Gerencie suas Palestras
      </h1>

      {/* Botão para criar palestra */}
      <div className="flex justify-start gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }} // Animação de escala mais suave
          whileTap={{ scale: 1 }} // Remove animação durante o clique
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl shadow-lg text-sm sm:text-base md:text-lg lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsVisible(!isVisible)} // Alterna a visibilidade do formulário
          style={{ pointerEvents: "auto" }} // Garante que o botão receba eventos de clique corretamente
        >
          <Plus size={20} /> Criar Quiz
        </motion.button>
      </div>

      {/* Formulário de criação de palestra (visível quando isVisible é true) */}
      {isVisible && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-md mb-6 border border-gray-300 dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-700 w-full sm:w-80 md:w-96 lg:w-96 xl:w-1/2 mx-auto"
        >
          {/* Campo de input para tema da palestra */}
          <input
            type="text"
            name="tema"
            placeholder="Ex.: Tema da palestra..."
            className="w-full p-4 rounded-lg text-black dark:text-white bg-transparent border-2 border-gray-400 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-md dark:shadow-lg backdrop-blur-md"
            value={formData.tema}
            onChange={formHandleChange}
            required
          />

          {/* Botões de confirmar e cancelar */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-6 py-3 rounded-lg text-white transition duration-300"
            >
              Confirmar
            </button>
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-800 focus:ring-2 focus:ring-orange-400 px-6 py-3 rounded-lg text-white transition duration-300"
              onClick={() => setIsVisible(false)} // Fecha o formulário ao cancelar
            >
              Cancelar
            </button>
          </div>
        </motion.form>
      )}

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
              whileHover={{ scale: 1.02 }} // Animação de hover nos cards
              className="flex justify-between items-center al dark:bg-gray-900 dark:text-white p-6 rounded-xl shadow-md relative cursor-pointer text-sm sm:text-base md:text-lg lg:text-base xl:text-lg max-w-xl w-full mx-auto"
              onClick={() =>
                navigate("/admQuiz", {
                  state: {
                    idPalestra: palestra.id,
                    codigoPalestra: palestra.uniqueCode,
                  },
                })
              } // Ao clicar no card, redireciona para a edição
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-black dark:text-white flex-1">
                {palestra.tema}
              </p>{" "}
              {/* Texto do card */}
              {/* Botão de excluir palestra */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-red-600 hover:text-red-800 transition absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o clique no botão de lixo acione o redirecionamento
                  openDeleteModal(palestra.id); // Abre o modal de confirmação
                }}
              >
                <Trash2 size={24} />
              </motion.button>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg w-80 dark:bg-gray-800 dark:text-white sm:w-72 md:w-80 lg:w-96 xl:w-1/2 mx-auto"
          >
            <h3 className="text-lg font-semibold text-center mb-4 text-black dark:text-white">
              Tem certeza?
            </h3>
            <p className="text-center mb-6 text-gray-800 dark:text-gray-200">
              Você está prestes a excluir esta palestra.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 flex-1"
                onClick={confirmDelete}
              >
                Excluir
              </button>
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex-1"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default PalestrasList;
