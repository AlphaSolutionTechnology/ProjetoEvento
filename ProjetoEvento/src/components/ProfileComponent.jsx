import React, { useState, useEffect, useContext } from 'react';
import { Box, Avatar, Typography, Button, Tabs, Tab, TextField, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert } from '@mui/material';
import QRCode from 'react-qr-code';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import CircularProgress from '@mui/material/CircularProgress';
import {Stack} from '@mui/material';
import { WebSocketContext } from '../context/WebSocketContext'; // Importa o WebSocketContext

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1); // Aba ativa
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Controle do modal scanner
  const [inputCode, setInputCode] = useState(''); // Código inserido manualmente
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Autenticação
  const [userData, setUserData] = useState(null); // Dados do usuário autenticado
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controle do Dialog
  const [dialogData, setDialogData] = useState(null); // Dados da solicitação recebida
  const [successAlert, setSuccessAlert] = useState(false); // Controle do alerta de sucesso
  const [unautorized, setUnautorized] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [alreadyConnected,setAlreadyConnected] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { sendMessage, messages } = useContext(WebSocketContext); // Obtém o WebSocketContext
  const [notFound,setNotFound] = useState(false);
  const backgroundColor = darkMode ? '#121212' : '#f5f5f5';
  const paperColor = darkMode ? '#1e1e1e' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const buttonColor = darkMode ? '#bb86fc' : '#3f51b5';
  const [waiting,setWaiting] = useState(false);

  const handleScan = (data) => {
    setInputCode(data);
    setIsScannerOpen(false);
    handleSendConnection(data);
    console.log('QR Code Lido:', data);
  };

  const handleSendConnection = (code) => {
    setInputCode("");
    if (!code) return;

    if (code === userData.unique_code) {
      setUnautorized(true);
      return;
    }
    setIsLoading(true);
    sendMessage('/app/sendrequest', {
      to: code, // ID do usuário solicitado
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
        localStorage.setItem('user_data', JSON.stringify(data));
      } else {
        console.log("Usuário não autenticado.");
        setIsAuthenticated(false);
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    }
  };

  const populateZone = () => {
    setUserData(() => JSON.parse(localStorage.getItem('user_data')));
  };


  useEffect(() => {
    checkAuthentication();
    populateZone();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setIsLoading(() => false);
      const lastMessage = messages[messages.length - 1];     
      if(lastMessage.to === userData?.unique_code && (lastMessage.message).indexOf("código") != -1){
        setNotFound(true);
      }
      else if(lastMessage.to === userData?.unique_code && (lastMessage.message).indexOf("Sucesso!") != -1){
        setSuccessAlert(true);
      }
      else if(lastMessage.to === userData?.unique_code && (lastMessage.message).indexOf("resposta!" != -1)){
        setWaiting(true);
      }
      else if (lastMessage.to === userData?.unique_code && (lastMessage.message).indexOf("conectados") != -1) {
        setAlreadyConnected(true);
      }else if (lastMessage.to === userData?.unique_code && (lastMessage.message).indexOf("conectar") != -1){

      } 
    }
  }, [messages, userData]); // Executa sempre que `messages` ou `userData` forem atualizados

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor }}>
        <Typography variant="h6" sx={{ color: textColor }}>Verificando autenticação...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: '8px', sm: '16px' },
        height: '100vh',
        color: textColor,
        backdropFilter: darkMode ? 'blur(10px)' : 'blur(10px)',
        borderRadius: '10px',
        boxShadow: darkMode ? '0px 4px 10px rgba(0, 0, 0, 0.5)' : '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
        <Avatar
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            margin: 'auto',
            marginBottom: '16px',
            backgroundColor: darkMode ? paperColor : '#e0e0e0',
            color: darkMode ? textColor : '#757575',
          }}
        />
        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
          {userData?.name || 'Usuário'}
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        centered
        sx={{
          marginBottom: '24px',
          '.MuiTab-root': {
            color: textColor,
            '&.Mui-selected': { color: buttonColor },
          },
        }}
      >
        <Tab label="Meu QR Code" />
        <Tab label="Conectar" />
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ marginBottom: '16px', color: textColor }}>
            Escaneie este QR Code para se conectar comigo.
          </Typography>
          <Box
            sx={{
              backgroundColor: paperColor,
              padding: '16px',
              borderRadius: '30px',
              display: 'inline-block',
              boxShadow: '0 4px 6px rgba(0,0,0,0.11)',
            }}
          >
            <QRCode value={String(userData.unique_code)} size={255} />
          </Box>
          <Typography variant="body2" sx={{ marginTop: '16px' }}>
            Ou Digite o código: {userData.unique_code}
          </Typography>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center', color: textColor }}>
            Digite o código do usuário ou escaneie um QR Code para se conectar.
          </Typography>
          <Button
            variant="contained"
            startIcon={<QrCodeScannerIcon />}
            onClick={() => setIsScannerOpen(true)}
            sx={{
              marginBottom: '16px',
              backgroundColor: buttonColor,
              '&:hover': { backgroundColor: darkMode ? '#9a67ea' : '#303f9f' },
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
              marginBottom: '16px',
              backgroundColor: darkMode ? '#424242' : paperColor,
              borderRadius: '4px',
            }}ló
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth
            onClick={() => handleSendConnection(inputCode)}
            disabled={!inputCode}
            sx={{
              backgroundColor: darkMode ? buttonColor : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
              '&:hover': { backgroundColor: darkMode ? '#9a67ea' : '#f5f5f5' },
            }}
          >
            Conectar
          </Button>
        </Box>
      )}

      <Modal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
          <Typography variant="h6">Escaneando QR Code...</Typography>
        </Box>
      </Modal>

      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => setSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessAlert(false)} severity="success" sx={{ width: '100%' }}>
          Solicitação enviada com sucesso!
        </Alert>
      </Snackbar>
      <Stack right="-14%" top="-1%" position="relative" spacing={2} direction="row" alignItems="center">
      {isLoading ? <CircularProgress size="3rem"/> : <></>}
     </Stack>
      <Snackbar
        open={unautorized}
        autoHideDuration={3000}
        onClose={() => setUnautorized(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
      <Alert onClose={() => setUnautorized(false)} severity="error" sx={{ width: '100%' }}>
          Você não pode se conectar consigo mesmo!
      </Alert>
      </Snackbar>
      <Snackbar
        open={notFound}
        autoHideDuration={3000}
        onClose={() => setNotFound(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
      <Alert onClose={() => setNotFound(false)} severity="error" sx={{ width: '100%' }}>
          Usuário não encontrado!
      </Alert>
      </Snackbar>
      <Snackbar
        open={waiting}
        autoHideDuration={3000}
        onClose={() => setWaiting(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
      <Alert onClose={() => setWaiting(false)} severity="error" sx={{ width: '100%' }}>
          Aguardando resposta!
      </Alert>
      </Snackbar>
      <Snackbar
        open={alreadyConnected}
        autoHideDuration={3000}
        onClose={() => setAlreadyConnected(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
      <Alert onClose={() => setAlreadyConnected(false)} severity="error" sx={{ width: '100%' }}>
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
        <DialogTitle id="alert-dialog-title">{"Nova Solicitação de Conexão"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData?.fromUser || "Um usuário"} quer se conectar com você.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Recusar</Button>
          <Button
            onClick={() => {
              // Aqui você pode chamar a função para aceitar a conexão
              setIsDialogOpen(false);
            }}
            autoFocus
          >
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileComponent;
