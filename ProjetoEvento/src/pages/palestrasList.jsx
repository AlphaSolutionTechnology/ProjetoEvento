import { useEffect, useState } from "react";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Navigate, useNavigate } from "react-router-dom";
import { Trash2, Plus, Edit } from "lucide-react";
import { motion } from "framer-motion";

function PalestrasList() {
  const [palestras, setPalestras] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    tema: "",
    evento: {
      id: "1",
      nome: "Primeiro Evento",
      data: "2025-03-25",
    },
  });

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
      const response = await fetch("http://localhost:8080/api/palestra/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createPalestra),
      });

      if (response.ok) {
        const data = await response.json();
        setPalestras((prevPalestras) => [...prevPalestras, data]);
        setFormData({
          tema: "",
          evento: {
            id: "1",
            nome: "Primeiro Evento",
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
      const response = await fetch("http://localhost:8080/api/palestra/lista", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const list = await response.json();
        setPalestras(list.map((palestra) => ({ ...palestra, checked: false })));
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

  const handleChange = (id) => {
    setPalestras((prevPalestras) =>
      prevPalestras.map((palestra) =>
        palestra.id === id
          ? { ...palestra, checked: !palestra.checked }
          : palestra
      )
    );
  };

  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [showEditarButton, setShowEditarButton] = useState(true);

  const toggleShowCheckBoxes = () => {
    if (showCheckBoxes) {
      handleDelete();
      setShowCheckBoxes(false);
      setShowEditarButton(true);
    } else {
      setPalestras((prevPalestras) =>
        prevPalestras.map((palestra) => ({ ...palestra, checked: false }))
      );
      setShowCheckBoxes(true);
      setShowEditarButton(false);
    }
  };

  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    setCheckedCount(palestras.filter((palestra) => palestra.checked).length);
  }, [palestras]);

  const handleDeleteSingle = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta palestra?");
    if (confirmDelete) {
      try {
        const response = await fetch("http://localhost:8080/api/palestra/excluir", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: [id] }), // Enviando o ID em um array
        });
  
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
  
  

  const handleNavigate = (idPalestra) => {
    navigate("/admQuizz", { state: { idPalestra: idPalestra } });
  };

  const toggleVisibility = (e) => {
    const originEvent = e.target.id;
    if (isVisible && originEvent === "criarButton") return;
    setIsVisible(!isVisible);
  };

  return (
    <div className=" min-h-screen p-6 text-white dark:bg-[#0d1117]">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
        Gerencie suas Palestras
      </h1>

      <div className="flex justify-start gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-xl shadow-lg"
          onClick={() => setIsVisible(!isVisible)}
        >
          <Plus size={20} /> Criar Palestra
        </motion.button>
      </div>

      {isVisible && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 p-4 rounded-xl shadow-md mb-6"
        >
          <input
            type="text"
            name="tema"
            placeholder="Ex.: Tema da palestra..."
            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.tema}
            onChange={formHandleChange}
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white">
              Confirmar
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
              onClick={() => setIsVisible(false)}
            >
              Cancelar
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-4">
        {palestras.length === 0 ? (
          <p className="text-center text-gray-400">Nenhuma palestra encontrada.</p>
        ) : (
          palestras.map((palestra) => (
            <motion.div
              key={palestra.id} // id precisa ser único
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center dark:bg-gray-900 dark:text-white p-4 rounded-xl shadow-md relative"
            >
              <p className="text-black dark:text-white">{palestra.tema}</p>
              <div className="flex flex-col items-center gap-2">
                <button
                  className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg flex items-center gap-1"
                  onClick={() => navigate("/admQuizz", { state: { idPalestra: palestra.id } })}
                >
                  <Edit size={16} /> Editar
                </button>
                <motion.button
                  whileTap={{ x: -100, opacity: 0 }}
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteSingle(palestra.id)}
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default PalestrasList;
