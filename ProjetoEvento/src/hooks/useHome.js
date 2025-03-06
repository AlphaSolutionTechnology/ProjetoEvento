import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useHome = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [codigoPalestra, setCodigoPalestra] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const validarPalestra = async (codigo) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_NETWORK_API_LINK
        }/api/palestra/inscrever/${codigo}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Palestra não encontrada");

      const data = await response.json();
      const idPalestra = data.idPalestra;

      if (!idPalestra) throw new Error("ID da Palestra não encontrado!");

      localStorage.setItem("palestraAtual", idPalestra);

      setToastType("success");
      setToastMessage("Palestra encontrada com sucesso!");
      setToastOpen(true);

      setTimeout(() => {
        navigate(`/palestra/${idPalestra}`);
      }, 2000);
    } catch (error) {
      setToastType("error");
      setToastMessage(
        "Palestra inválida ou não encontrada. Verifique o código."
      );
      setToastOpen(true);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    isScanning,
    setIsScanning,
    codigoPalestra,
    setCodigoPalestra,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    validarPalestra,
  };
};

export default useHome;
