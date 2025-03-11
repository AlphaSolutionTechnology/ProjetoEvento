import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useConnection = (user) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSendConnection = async (code) => {
    if (!code || typeof code !== "string" || code.trim().length !== 6) {
      setAlert({
        open: true,
        message: "O código deve ter exatamente 6 caracteres.",
        type: "error",
      });
      return;
    }

    if (user?.unique_code && code == user.unique_code) {
      setAlert({
        open: true,
        message: "Você não pode se conectar consigo mesmo!",
        type: "error",
      });
      return;
    }

    code = code.toUpperCase();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOCAL_API_LINK
        }/api/connection/sendconnectionrequest`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ from: user.unique_code, to: code }),
        }
      );

      const data = await response.json();

      switch (response.status) {
        case 200: // OK
          setAlert({ open: true, message: data.server, type: "success" });
          break;

        case 400: // BAD REQUEST
          setAlert({ open: true, message: data.server, type: "error" });
          break;

        case 406: // UNAUTHORIZED
          setAlert({ open: true, message: data.server, type: "warning" });
          break;

        case 403: // FORBIDDEN
          setAlert({
            open: true,
            message: "Sua sessão expirou. Faça login novamente.",
            type: "error",
          });
          navigate("/login");
          break;

        case 409: // CONFLICT
          setAlert({
            open: true,
            message: "Vocês já estão conectados!",
            type: "info",
          });
          break;

        case 500: // INTERNAL SERVER ERROR
          setAlert({
            open: true,
            message: "Erro no servidor. Tente novamente mais tarde.",
            type: "error",
          });
          break;

        default:
          setAlert({
            open: true,
            message: data.server || "Erro desconhecido.",
            type: "error",
          });
          break;
      }
    } catch (error) {
      console.error("❌ Erro ao conectar:", error);
      setAlert({
        open: true,
        message: "Erro de conexão com o servidor.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSendConnection, isLoading, alert, setAlert };
};
