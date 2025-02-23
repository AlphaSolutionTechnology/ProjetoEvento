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
import AlertToast from "../alert/AlertToast"; // Importe o AlertToast

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

  const [dialogData, setDialogData] = useState({
    fromUserName: "",
    fromUserCode: "",
  });

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert((prevState) => ({ ...prevState, open: false }));
      }, 3000);

      // Limpeza do timer quando o componente é desmontado
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const checkAuthentication = async (code) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_NETWORK_API_LINK}
/api/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
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
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const handleSendConnection = async (code) => {
    setInputCode(""); // Limpa o código

    // Verificações de entrada
    if (!code) {
      setAlert({
        open: true,
        message: "Por favor, insira um código.",
        type: "error",
      });
      return;
    }

    if (typeof code !== "string" || code.trim().length !== 6) {
      setAlert({
        open: true,
        message: "O código deve ter exatamente 6 caracteres.",
        type: "error",
      });
      return;
    }

    if (code === userData.unique_code) {
      setUnautorized(true);
      setAlert({
        open: true,
        message: "Você não pode se conectar consigo mesmo!",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendMessage("/app/sendrequest", { to: code });
      console.log("response:", response);

      // Verifique se a resposta é válida
      if (!response) {
        setAlert({
          open: true,
          message: "Erro ao enviar solicitação: Usuario nao encontrado.",
          type: "error",
        });
        return;
      }

      // Se a resposta for válida
      if (response.success) {
        setAlert({
          open: true,
          message: "Solicitação de conexão enviada com sucesso!",
          type: "success",
        });
      } else {
        setAlert({
          open: true,
          message:
            response.message || "Erro desconhecido ao enviar solicitação.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      setAlert({
        open: true,
        message: "Usuário não encontrado ou erro ao enviar solicitação.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const populateZone = () => {
    const storedUserData = localStorage.getItem("user_data");
    if (storedUserData) {
      setUserData(() => JSON.parse(storedUserData));
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    checkAuthentication();
    populateZone();
  }, []);

  useEffect(() => {
    console.log("Messages:", messages);
    console.log("User Data:", userData);

    if (messages.length > 0 && userData) {
      setIsLoading(false);

      const lastMessage = messages[messages.length - 1];
      console.log("Última mensagem recebida:", lastMessage.message);

      if (String(lastMessage.to) === String(userData.unique_code)) {
        // 1) Notificação de pedido de conexão
        if (lastMessage.message.includes("quer se conectar")) {
          console.log("Mensagem de conexão recebida:", lastMessage.message);
          setDialogData({
            fromUserName: lastMessage.name,
            fromUserCode: lastMessage.from,
          });
          setIsDialogOpen(true);
        }

        // 2) Usuário não encontrado (não precisa mais de setAlert aqui, pois já é tratado no handleSendConnection)
        else if (lastMessage.message.includes("código")) {
          console.log("Usuário não encontrado. Tente novamente.");
          
        }

        // 3) Sucesso no envio
        else if (lastMessage.message.includes("Sucesso!")) {
          console.log("Solicitação de conexão enviada com sucesso!");
        }

        // 4) Aguardando resposta
        else if (lastMessage.message.includes("resposta!")) {
          setWaiting(true);

          // 5) Já conectados
        } else if (lastMessage.message.includes("conectados")) {
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
    <div className="p-4 h-screen bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-2xl dark:bg-black dark:bg-opacity-30 dark:border-black dark:border-opacity-20">
      {/* Seção de Avatar e Nome */}
      <AvatarSection userData={userData} darkMode={darkMode} />

      {/* Seção de Tabs */}
      <section className="flex justify-center mb-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setActiveTab(0)}
                className={`relative px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 0
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 border-b-2 border-transparent hover:border-blue-600"
                }`}
              >
                Meu QR Code
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(1)}
                className={`relative px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 1
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 border-b-2 border-transparent hover:border-blue-600"
                }`}
              >
                Conectar
              </button>
            </li>
          </ul>
        </nav>
      </section>

      {/* Conteúdo das abas */}
      {activeTab === 0 && (
        <QRCodeSection userData={userData} darkMode={darkMode} />
      )}
      {activeTab === 1 && (
        <ConnectionForm
          darkMode={darkMode}
          sendMessage={sendMessage}
          setIsScannerOpen={setIsScannerOpen}
          inputCode={inputCode} // Passando inputCode
          setInputCode={setInputCode} // Passando setInputCode
          handleSendConnection={handleSendConnection}
        />
      )}

      {/* Modal e Dialog */}
      <QRScannerModal
        isScannerOpen={isScannerOpen}
        setIsScannerOpen={setIsScannerOpen}
        handleScan={(data) => {
          setIsScannerOpen(false);
          setInputCode(data); // Atualiza o campo de input
          handleSendConnection(data); // Envia o código automaticamente
        }}
        darkMode={darkMode}
      />

      <ConnectionRequestDialog
        fromUserName={dialogData.fromUserName}
        fromUserCode={dialogData.fromUserCode}
      />

      {/* Indicador de carregamento */}
      <motion.div className="flex justify-center mt-4">
        {isLoading && (
          <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
        )}
      </motion.div>

      {/* AlertToast */}
      <AlertToast
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </div>
  );
};

export default ProfileComponent;
