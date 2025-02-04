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
        setFormData({ tema: "" });
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

  const handleDelete = async () => {
    const palestrasToDelete = palestras.filter((palestra) => palestra.checked);

    if (palestrasToDelete.length === 0) {
      alert("Nenhuma palestra selecionada para excluir.");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir as palestras selecionadas?"
    );

    if (confirmDelete) {
      const idsToDelete = palestrasToDelete.map((palestra) => palestra.id);

      try {
        const response = await fetch(
          "http://localhost:8080/api/palestra/excluir",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: idsToDelete }),
          }
        );

        if (response.ok) {
          setPalestras((prevPalestras) =>
            prevPalestras.filter((palestra) => !palestra.checked)
          );
        } else {
          alert("Erro ao excluir palestras");
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
    <div className="bg-white p-4">
      <h1 className="text-black text-center text-3xl font-bold mb-4">
        PALESTRAS
      </h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-600 text-white rounded-lg p-2 font-bold flex items-center gap-2"
          id="criarButton"
          onClick={toggleVisibility}
        >
          <Plus size={20} /> Criar
        </button>
        <button
          className="bg-red-600 text-white rounded-lg p-2 font-bold flex items-center gap-2"
          id="excluirButton"
          onClick={toggleShowCheckBoxes}
        >
          <Trash2 size={20} /> Excluir {showCheckBoxes && `(${checkedCount})`}
        </button>
      </div>

      {isVisible && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mb-4"
        >
          <input
            type="text"
            name="tema"
            placeholder="Ex.: tema saúde..."
            className="rounded border border-black p-2 text-black"
            value={formData.tema}
            onChange={formHandleChange}
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded-lg"
            >
              Confirmar
            </button>
            <button
              type="button"
              className="bg-red-700 text-white p-2 rounded-lg"
              onClick={toggleVisibility}
            >
              Cancelar
            </button>
          </div>
        </motion.form>
      )}

      <div className="h-64 overflow-y-auto space-y-2">
        {palestras.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma palestra encontrada
          </p>
        ) : (
          palestras.map((palestra) => (
            <motion.div
              key={palestra.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <p className="text-black font-medium">{palestra.tema}</p>
              {showEditarButton && (
                <button
                  className="bg-gray-600 text-white p-2 rounded-lg flex items-center gap-1"
                  onClick={() => handleNavigate(palestra.id)}
                >
                  <Edit size={16} /> Editar
                </button>
              )}
              {showCheckBoxes && (
                <Checkbox
                  checked={palestra.checked}
                  onChange={() => handleChange(palestra.id)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default PalestrasList;
