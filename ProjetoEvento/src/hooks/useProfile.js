import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "@/contexts/WebSocketContext";
import { checkAuthentication, validateUser } from "@/services/authService";

export const useProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const { messages } = useContext(WebSocketContext);
  const navigate = useNavigate();

  const backgroundColor = "#f5f5f5";
  const textColor = "#333";

  const populateZone = () => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
  };

  const handleWebSocketMessages = () => {
    if (messages.length > 0 && userData) {
      const lastMessage = messages[messages.length - 1];
      console.log("Última mensagem:", lastMessage.message);
    }
  };

  const checkAuth = async () => {
    try {
      const data = await checkAuthentication();
      setIsAuthenticated(true);
      localStorage.setItem("user_data", JSON.stringify(data));
    } catch {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return {
    isAuthenticated,
    userData,
    backgroundColor,
    textColor,
    checkAuthentication: checkAuth,
    populateZone,
    handleWebSocketMessages,
  };
};
