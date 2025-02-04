// path: src/components/profile/ProfileComponent.jsx

import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Tabs, Tab, Snackbar, Alert, Stack, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../../context/WebSocketContext";
import useTheme from "../../hooks/useTheme";
import AvatarSection from "./AvatarSection";
import QRCodeSection from "./QRCodeSection";
import ConnectionForm from "./ConnectionForm";
import QRScannerModal from "./QRScannerModal";
import ConnectionRequestDialog from "./ConnectionRequestDialog";

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { sendMessage, messages } = useContext(WebSocketContext);

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

  // Verifica autenticação no mount
  useEffect(() => {
    checkAuthentication();
    populateZone();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && userData) {
      setIsLoading(false);

      const lastMessage = messages[messages.length - 1];
      console.log("Última mensagem recebida:", lastMessage.message);

      // 1) Notificação de pedido de conexão
      if (
        lastMessage.to === userData.unique_code &&
        lastMessage.message.includes("quer se conectar")
      ) {
        console.log("Mensagem de conexão recebida:", lastMessage.message);

        // Salva dados necessários para aceitar/recusar
        setDialogData({
          fromUserName: lastMessage.name, // nome de quem enviou
          fromUserCode: lastMessage.from, // unique_code de quem enviou
        });

        setIsDialogOpen(true);

        // 2) Usuário não encontrado
      } else if (
        lastMessage.to === userData.unique_code &&
        lastMessage.message.includes("código")
      ) {
        setNotFound(true);

        // 3) Sucesso no envio
      } else if (
        lastMessage.to === userData.unique_code &&
        lastMessage.message.includes("Sucesso!")
      ) {
        setSuccessAlert(true);

        // 4) Aguardando resposta
      } else if (
        lastMessage.to === userData.unique_code &&
        lastMessage.message.includes("resposta!")
      ) {
        setWaiting(true);

        // 5) Já conectados
      } else if (
        lastMessage.to === userData.unique_code &&
        lastMessage.message.includes("conectados")
      ) {
        setAlreadyConnected(true);
      }
    }
  }, [messages, userData]);

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Typography variant="h6">Verificando autenticação...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "16px", height: "100vh" }}>
      {/* Seção de Avatar e Nome */}
      <AvatarSection userData={userData} darkMode={darkMode} />

      {/* Seção de Tabs */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
        <Tab label="Meu QR Code" />
        <Tab label="Conectar" />
      </Tabs>

      {/* Conteúdo das abas */}
      {activeTab === 0 && <QRCodeSection userData={userData} darkMode={darkMode} />}
      {activeTab === 1 && <ConnectionForm darkMode={darkMode} sendMessage={sendMessage} />}

      {/* Modal e Dialog */}
      <QRScannerModal />
      <ConnectionRequestDialog />

      {/* Indicador de carregamento */}
      <Stack direction="row" spacing={2}>
        {isLoading && <CircularProgress />}
      </Stack>

      {/* Snackbars */}
      <Snackbar open={successAlert} autoHideDuration={3000} onClose={() => setSuccessAlert(false)}>
        <Alert onClose={() => setSuccessAlert(false)} severity="success">Solicitação enviada!</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileComponent;
