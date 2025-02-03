import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import QRCode from "react-qr-code";
import SendIcon from "@mui/icons-material/Send";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CircularProgress from "@mui/material/CircularProgress";
import { WebSocketContext } from "../context/WebSocketContext"; // Importa o WebSocketContext
import QRScanner from "./QRScanner";

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null); // <= Para armazenar dados do pedido
  const [successAlert, setSuccessAlert] = useState(false);
  const [unautorized, setUnautorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyConnected, setAlreadyConnected] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { sendMessage, messages } = useContext(WebSocketContext);
  const [notFound, setNotFound] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const backgroundColor = darkMode ? "#121212" : "#f5f5f5";
  const paperColor = darkMode ? "#1e1e1e" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#333333";
  const buttonColor = darkMode ? "#bb86fc" : "#3f51b5";

  // Função que é chamada quando o QRScanner lê um QR Code
  const handleScan = (data) => {
    setInputCode(data);
    setIsScannerOpen(false);
    handleSendConnection(data);
    console.log("QR Code Lido:", data);
  };

  // Função para enviar solicitação de conexão
  const handleSendConnection = (code) => {
    setInputCode("");
    if (!code) return;

    if (code === userData.unique_code) {
      setUnautorized(true);
      return;
    }
    setIsLoading(true);
    // Envia via WebSocket (STOMP) para o backend
    sendMessage("/app/sendrequest", {
      to: code,
    });
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

  // Verifica autenticação no mount
  useEffect(() => {
    checkAuthentication();
    populateZone();
  }, []);

  // Escuta mensagens WebSocket
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

  // Função para aceitar solicitação
  const handleAcceptConnection = async () => {
    try {
      await fetch(
        "http://localhost:8080/api/connection/answerconnectionrequest",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            to: userData.unique_code, // Você
            from: dialogData.fromUserCode, // Quem fez o pedido
            status: "ACCEPTED",
          }),
        },
      );

      setIsDialogOpen(false);
      // Caso queira mostrar um alert de sucesso
      setSuccessAlert(true);
    } catch (error) {
      console.error("Erro ao aceitar conexão:", error);
      // Exibir algum alert de erro, se quiser
    }
  };

  // Função para recusar solicitação
  const handleDeclineConnection = async () => {
    try {
      await fetch(
        "http://localhost:8080/api/connection/answerconnectionrequest",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            to: userData.unique_code,
            from: dialogData.fromUserCode,
            status: "DECLINED",
          }),
        },
      );

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao recusar conexão:", error);
      // Exibir algum alert de erro, se quiser
    }
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor,
        }}
      >
        <Typography variant="h6" sx={{ color: textColor }}>
          Verificando autenticação...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: "8px", sm: "16px" },
        height: "100vh",
        color: textColor,
        backdropFilter: darkMode ? "blur(10px)" : "blur(10px)",
        borderRadius: "10px",
        boxShadow: darkMode
          ? "0px 4px 10px rgba(0, 0, 0, 0.5)"
          : "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header Profile */}
      <Box sx={{ textAlign: "center", marginBottom: "32px" }}>
        <Avatar
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            margin: "auto",
            marginBottom: "16px",
            backgroundColor: darkMode ? paperColor : "#e0e0e0",
            color: darkMode ? textColor : "#757575",
          }}
        />
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}
        >
          {userData?.name || "Usuário"}
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        centered
        sx={{
          marginBottom: "24px",
          ".MuiTab-root": {
            color: textColor,
            "&.Mui-selected": { color: buttonColor },
          },
        }}
      >
        <Tab label="Meu QR Code" />
        <Tab label="Conectar" />
      </Tabs>

      {/* Aba 0: Meu QR Code */}
      {activeTab === 0 && (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "16px", color: textColor }}
          >
            Escaneie este QR Code para se conectar comigo.
          </Typography>
          <Box
            sx={{
              backgroundColor: paperColor,
              padding: "16px",
              borderRadius: "30px",
              display: "inline-block",
              boxShadow: "0 4px 6px rgba(0,0,0,0.11)",
            }}
          >
            <QRCode value={String(userData.unique_code)} size={255} />
          </Box>
          <Typography variant="body2" sx={{ marginTop: "16px" }}>
            Ou Digite o código: {userData.unique_code}
          </Typography>
        </Box>
      )}

      {/* Aba 1: Conectar */}
      {activeTab === 1 && (
        <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "16px", textAlign: "center", color: textColor }}
          >
            Digite o código do usuário ou escaneie um QR Code para se conectar.
          </Typography>
          <Button
            variant="contained"
            startIcon={<QrCodeScannerIcon />}
            onClick={() => setIsScannerOpen(true)}
            sx={{
              marginBottom: "16px",
              backgroundColor: buttonColor,
              "&:hover": { backgroundColor: darkMode ? "#9a67ea" : "#303f9f" },
            }}
            fullWidth
          >
            Escanear QR Code
          </Button>
          <TextField
            label="Inserir Código"
            variant="outlined"
            fullWidth
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            sx={{
              marginBottom: "16px",
              backgroundColor: darkMode ? "#8C8C8C" : "#FFFFFF",
              borderRadius: "4px",
            }}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth
            onClick={() => handleSendConnection(inputCode)}
            disabled={!inputCode}
            sx={{
              backgroundColor: darkMode ? buttonColor : "#1976D2",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: darkMode ? "#9a67ea" : "#1565C0",
              },
              "&:disabled": {
                backgroundColor: darkMode ? "#444444" : "#e0e0e0",
                color: "#bdbdbd",
              },
            }}
          >
            Conectar
          </Button>
        </Box>
      )}

      {/* Modal de Scanner */}
      <Modal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
            color: darkMode ? "#ffffff" : "#333333",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: darkMode
              ? "0px 4px 10px rgba(0, 0, 0, 0.9)"
              : "0px 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: "16px",
              color: darkMode ? "#ffffff" : "#333333",
            }}
          >
            Escaneando QR Code
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              overflow: "hidden",
              border: `1px solid ${darkMode ? "#444444" : "#ccc"}`,
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <QRScanner onScan={handleScan} />
          </Box>

          <Button
            variant="outlined"
            onClick={() => setIsScannerOpen(false)}
            sx={{
              marginTop: "16px",
              color: darkMode ? "#ffffff" : "#333333",
              borderColor: darkMode ? "#bb86fc" : "#3f51b5",
              "&:hover": {
                backgroundColor: darkMode ? "#bb86fc" : "#3f51b5",
                color: "#ffffff",
              },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>

      {/* Indicador de loading ao enviar requisição */}
      <Stack
        right="-14%"
        top="-1%"
        position="relative"
        spacing={2}
        direction="row"
        alignItems="center"
      >
        {isLoading ? <CircularProgress size="3rem" /> : null}
      </Stack>

      {/* Snackbars */}
      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => setSuccessAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Solicitação enviada/atualizada com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar
        open={unautorized}
        autoHideDuration={3000}
        onClose={() => setUnautorized(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setUnautorized(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Você não pode se conectar consigo mesmo!
        </Alert>
      </Snackbar>
      <Snackbar
        open={notFound}
        autoHideDuration={3000}
        onClose={() => setNotFound(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotFound(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Usuário não encontrado!
        </Alert>
      </Snackbar>
      <Snackbar
        open={waiting}
        autoHideDuration={3000}
        onClose={() => setWaiting(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setWaiting(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Aguardando resposta!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alreadyConnected}
        autoHideDuration={3000}
        onClose={() => setAlreadyConnected(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlreadyConnected(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Usuários já estão conectados
        </Alert>
      </Snackbar>

      {/* Dialog para nova solicitação de conexão */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Nova Solicitação de Conexão"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData?.fromUserName || "Um usuário"} quer se conectar com
            você.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeclineConnection}>Recusar</Button>
          <Button onClick={handleAcceptConnection} autoFocus>
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileComponent;
