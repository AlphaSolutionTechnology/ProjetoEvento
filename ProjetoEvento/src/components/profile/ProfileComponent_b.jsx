// path: src/components/profile/ProfileComponent.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../../context/WebSocketContext";
import useTheme from "../../hooks/useTheme";
import { motion } from "framer-motion";
import AvatarSection from "./AvatarSection";
import QRCodeSection from "./QRCodeSection";
import ConnectionForm from "./ConnectionForm"; // Já está importado corretamente
import QRScannerModal from "./QRScannerModal";
import ConnectionRequestDialog from "./ConnectionRequestDialog";

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");  
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { sendMessage, messages } = useContext(WebSocketContext);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });
  const [unautorized, setUnautorized] = useState(false);  
  const [waiting, setWaiting] = useState(false);
  const [alreadyConnected, setAlreadyConnected] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [dialogData, setDialogData] = useState({ fromUserName: "", fromUserCode: "" });



  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert((prevState => ({ ...prevState, open: false })));
      }, 3000);

      // limpeza do timer quando o componente é desmontado
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSendConnection = async (code) => {
    setInputCode("");  // Limpa o código
  
    if (!code) {
      setAlert({ open: true, message: "Por favor, insira um código.", type: "error" });
      return;
    }
  
    if (typeof code !== "string" || code.trim().length !== 6) {
      setAlert({ open: true, message: "O código deve ter exatamente 6 caracteres.", type: "error" });
      return;
    }
  
    if (code === userData.unique_code) {
      setUnautorized(true);
      setAlert({ open: true, message: "Você não pode se conectar consigo mesmo!", type: "error" });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const userExists = await checkAuthentication(code);
  
      if (!userExists) {
        setAlert({ open: true, message: "Código inválido ou usuário não encontrado.", type: "error" });
        return;
      }
  
      await sendMessage("/app/sendrequest", { to: code });
  
      setAlert({ open: true, message: "Solicitação de conexão enviada com sucesso!", type: "success" });
    } catch (error) {
      setAlert({ open: true, message: "Erro ao enviar solicitação. Tente novamente.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/validate", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem("user_data", JSON.stringify(data));
      } else {
        console.log("Usuário não autenticado.");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  const populateZone = () => {
    setUserData(() => JSON.parse(localStorage.getItem("user_data")));
  };

  useEffect(() => {
    checkAuthentication();
    populateZone();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && userData) {
      setIsLoading(false);
  
      const lastMessage = messages[messages.length - 1];
      console.log("Última mensagem recebida:", lastMessage.message);
  
      if (lastMessage.to === userData.unique_code) {
        if (lastMessage.message.includes("quer se conectar")) {
          console.log("Mensagem de conexão recebida:", lastMessage.message);
  
          // Atualizando os dados do diálogo com as informações do usuário
          setDialogData({
            fromUserName: lastMessage.name,
            fromUserCode: lastMessage.from,
          });
  
          // Abrindo o diálogo/modal
          setIsDialogOpen(true);
        } else if (lastMessage.message.includes("código")) {
          // Usuário não encontrado
          setNotFound(true);
        } else if (lastMessage.message.includes("Sucesso!")) {
          // Conexão bem-sucedida
          setSuccessAlert(true);
        } else if (lastMessage.message.includes("resposta!")) {
          // Aguardando resposta
          setWaiting(true);
        } else if (lastMessage.message.includes("conectados")) {
          // Usuário já está conectado
          setAlreadyConnected(true);
        }
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
    <div className="p-4 h-screen">
      {/* Seção de Avatar e Nome */}
      <AvatarSection userData={userData} darkMode={darkMode} />

      {/* Seção de Tabs */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-4 py-2 mx-2 ${activeTab === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-md`}
        >
          Meu QR Code
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 mx-2 ${activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-md`}
        >
          Conectar
        </button>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === 0 && <QRCodeSection userData={userData} darkMode={darkMode} />}
      {activeTab === 1 && (
        <ConnectionForm
          darkMode={darkMode}
          sendMessage={sendMessage}
          setIsScannerOpen={setIsScannerOpen}
          inputCode={inputCode}  // Passando inputCode
          setInputCode={setInputCode}  // Passando setInputCode
          handleSendConnection={handleSendConnection}
        />
      )}

      {/* Modal e Dialog */}
      <QRScannerModal isScannerOpen={isScannerOpen} setIsScannerOpen={setIsScannerOpen} />
      <ConnectionRequestDialog />

      {/* Indicador de carregamento */}
      <motion.div className="flex justify-center mt-4">
        {isLoading && <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>}
      </motion.div>

      {/* Alertas */}
      {alert.open && (
        <motion.div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white 
            ${alert.type === "success" ? "bg-green-500" : alert.type === "error" ? "bg-red-500" : "bg-blue-500"}`}
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          exit={{ opacity: 0, y: 20 }}  
          transition={{
            opacity: { duration: 0.5, ease: "easeInOut" }, 
            y: { duration: 0.3, ease: "easeOut" }  
          }}
        >
          {alert.message}
        </motion.div>
      )}


    </div>
  );
};

export default ProfileComponent;
