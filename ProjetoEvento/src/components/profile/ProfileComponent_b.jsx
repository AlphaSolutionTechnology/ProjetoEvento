import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../../context/WebSocketContext";
import useTheme from "../../hooks/useTheme";
import { motion } from "framer-motion";
import AvatarSection from "./AvatarSection";
import QRCodeSection from "./QRCodeSection";
import ConnectionForm from "./ConnectionForm";
import QRScannerModal from "./QRScannerModal";
import ConnectionRequestDialog from "./ConnectionRequestDialog";
import AlertToast from "../alert/AlertToast";

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { sendMessage, messages } = useContext(WebSocketContext);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });

  // 🔹 Estados adicionados para evitar erros
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [alreadyConnected, setAlreadyConnected] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const [dialogData, setDialogData] = useState({
    fromUserName: "",
    fromUserCode: "",
  });

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert((prevState) => ({ ...prevState, open: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const checkAuthentication = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_LINK}/api/auth/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem("user_data", JSON.stringify(data));
      } else {
        console.warn("⚠️ Usuário não autenticado.");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const handleSendConnection = async (code) => {
    setInputCode("");

    if (!code) {
      setAlert({ open: true, message: "Por favor, insira um código.", type: "error" });
      return;
    }

    if (typeof code !== "string" || code.trim().length !== 6) {
      setAlert({ open: true, message: "O código deve ter exatamente 6 caracteres.", type: "error" });
      return;
    }

    if (userData?.unique_code && code === userData.unique_code) {
      setUnauthorized(true);
      setAlert({ open: true, message: "Você não pode se conectar consigo mesmo!", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendMessage("/app/sendrequest", { to: code });
      if (!response) {
        setAlert({ open: true, message: "Erro ao enviar solicitação: Usuário não encontrado.", type: "error" });
        return;
      }

      if (response.success) {
        setAlert({ open: true, message: "Solicitação de conexão enviada com sucesso!", type: "success" });
      } else {
        setAlert({ open: true, message: response.message || "Erro desconhecido ao enviar solicitação.", type: "error" });
      }
    } catch (error) {
      setAlert({ open: true, message: "Usuário não encontrado ou erro ao enviar solicitação.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const populateZone = () => {
    const storedUserData = localStorage.getItem("user_data");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    checkAuthentication();
    populateZone();
  }, []);

  useEffect(() => {
    if (!userData || !userData.unique_code) {
      console.warn("⚠️ userData ainda não carregado corretamente!", userData);
      return;
    }

    if (messages.length > 0) {
      setIsLoading(false);
      const lastMessage = messages[messages.length - 1];

      console.log("📩 Última mensagem recebida:", lastMessage);

      if (String(lastMessage.to).trim().toLowerCase() === String(userData.unique_code).trim().toLowerCase()) {
        if (lastMessage.message.includes("quer se conectar")) {
          setDialogData({ fromUserName: lastMessage.name, fromUserCode: lastMessage.from });
          setIsDialogOpen(true);
        } else if (lastMessage.message.includes("resposta!")) {
          setWaiting(true);
        } else if (lastMessage.message.includes("conectados")) {
          setAlreadyConnected(true);
        }
      } else {
        console.warn("🚨 Mensagem recebida, mas não corresponde ao usuário!", lastMessage.to, "!==", userData.unique_code);
      }
    }
  }, [messages, userData]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-2xl dark:bg-black dark:bg-opacity-30 dark:border-black dark:border-opacity-20">
      <AvatarSection userData={userData} darkMode={darkMode} />

      <section className="flex justify-center mb-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button onClick={() => setActiveTab(0)} className={`relative px-6 py-3 rounded-md transition-all duration-300 ${activeTab === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 border-b-2 border-transparent hover:border-blue-600"}`}>
                Meu QR Code
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab(1)} className={`relative px-6 py-3 rounded-md transition-all duration-300 ${activeTab === 1 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 border-b-2 border-transparent hover:border-blue-600"}`}>
                Conectar
              </button>
            </li>
          </ul>
        </nav>
      </section>

      {activeTab === 0 && <QRCodeSection userData={userData} darkMode={darkMode} />}
      {activeTab === 1 && <ConnectionForm darkMode={darkMode} sendMessage={sendMessage} setIsScannerOpen={setIsScannerOpen} inputCode={inputCode} setInputCode={setInputCode} handleSendConnection={handleSendConnection} />}

      <QRScannerModal isScannerOpen={isScannerOpen} setIsScannerOpen={setIsScannerOpen} handleScan={(data) => { setIsScannerOpen(false); setInputCode(data); handleSendConnection(data); }} darkMode={darkMode} />

      <ConnectionRequestDialog fromUserName={dialogData.fromUserName} fromUserCode={dialogData.fromUserCode} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      <AlertToast open={alert.open} type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, open: false })} />
    </div>
  );
};

export default ProfileComponent;
