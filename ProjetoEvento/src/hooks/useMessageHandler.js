// useMessageHandler.js
import { useState, useContext, useEffect } from "react"; // Corrigido: useEffect importado
import { WebSocketContext } from "../context/WebSocketContext"; // Corrigido: WebSocketContext importado
import useAuth from "../hooks/useAuth";

export const useMessageHandler = () => {
  const { messages } = useContext(WebSocketContext); // Corrigido: WebSocketContext usado
  const { user } = useAuth();
  const [dialogData, setDialogData] = useState({
    fromUserName: "",
    fromUserCode: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });

  useEffect(() => {
    if (!user || !user.unique_code) {
      console.warn("⚠️ userData ainda não carregado corretamente!", user);
      return;
    }

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const messageTo = String(lastMessage?.to || "").trim().toUpperCase();
      const currentUserCode = String(user.unique_code || "").trim().toUpperCase();
      const messageText = lastMessage?.message ? lastMessage.message.trim() : "";

      if (messageTo === currentUserCode) {
        switch (messageText) {
          case "Você não pode enviar solicitação para si!":
          case "Não foi encontrado nenhum usuário com esse código:":
            setAlert({ open: true, message: messageText, type: "error" });
            break;

          case "Usuarios já estão conectados":
            setAlert({ open: true, message: "Vocês já estão conectados!", type: "info" });
            break;

          case "Aguardando resposta do outro usuário":
            setAlert({ open: true, message: "Aguardando resposta do outro usuário...", type: "warning" });
            break;

          case "Sucesso!":
            setAlert({ open: true, message: "Solicitação enviada com sucesso!", type: "success" });
            break;

          default:
            if (messageText.includes("quer se conectar com você!")) {
              setDialogData({
                fromUserName: messageText.split(" ")[0],
                fromUserCode: lastMessage.from,
              });
              setIsDialogOpen(true);
            } else {
              console.warn("⚠️ Mensagem desconhecida recebida:", messageText);
            }
        }
      } else {
        console.warn("🚨 Mensagem recebida, mas não corresponde ao usuário!", lastMessage.to, "!==", user.unique_code);
      }
    }
  }, [messages, user]);

  return { dialogData, isDialogOpen, setIsDialogOpen, alert, setAlert };
};