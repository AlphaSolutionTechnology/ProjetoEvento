import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QRCode from 'react-qr-code';
import { Box, Avatar, Typography, Button, Tabs, Tab, TextField, Modal } from '@mui/material';
import QRScanner from './QRScanner';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
    },
  },
});

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1); // Aba ativa
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Controle do modal scanner
  const [inputCode, setInputCode] = useState(''); // Código inserido manualmente
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Autenticação
  const [userData, setUserData] = useState(null); // Dados do usuário autenticado

  const localId = JSON.parse(localStorage.getItem('user_data')).unique_code;


  const handleSendConnection = (code) => {
    fetch("http://localhost:8080/api/connection/sendconnection", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSolicitante: localId,
        idSolicitado: code,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        return response.json();
      })
      .then((data) => {
        console.log("Conexão enviada com sucesso!", data);
        alert("Conexão realizada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao enviar conexão:", error);
        alert("Erro ao conectar. Tente novamente.");
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      console.log(storedData.unique_code)
      setIsAuthenticated(true);
    } else {
      navigate("/googletest");
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Typography variant="h6">Verificando autenticação...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: '16px', backgroundColor: theme.palette.background.default, height: '100vh' }}>
        {/* Avatar e Nome do Usuário */}
        <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
          <Avatar sx={{ width: 100, height: 100, margin: 'auto', marginBottom: '16px' }} />
          <Typography variant="h6">{userData?.name || "Usuário"}</Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
          sx={{ marginBottom: '24px' }}
        >
          <Tab label="Meu QR Code" />
          <Tab label="Conectar" />
        </Tabs>

        {/* Conteúdo das Abas */}
        {activeTab === 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
              Escaneie este QR Code para se conectar comigo.
            </Typography>
            <Box
              sx={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                display: 'inline-block',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <QRCode value={String(localId)} size={255} />
            </Box>
            <p>Ou Digite o código: {localId}</p>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
            <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
              Digite o código do usuário ou escaneie um QR Code para se conectar.
            </Typography>
            {/* Botão para Escanear QR Code */}
            <Button
              variant="contained"
              startIcon={<QrCodeScannerIcon />}
              onClick={() => setIsScannerOpen(true)}
              sx={{ marginBottom: '16px' }}
              fullWidth
            >
              Escanear QR Code
            </Button>
            {/* Campo para Inserir Código Manual */}
            <TextField
              label="Inserir Código"
              variant="outlined"
              fullWidth
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              sx={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
              onClick={() => handleSendConnection(inputCode)}
              disabled={!inputCode}
            >
              Conectar
            </Button>
          </Box>
        )}

        {/* Modal QR Scanner */}
        <Modal
          open={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box sx={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Escaneie um QR Code
            </Typography>
            <QRScanner
              onResult={(result) => {
                setIsScannerOpen(false);
                handleSendConnection(result); // Conectar automaticamente após escanear
              }}
            />
            <Button onClick={() => setIsScannerOpen(false)} sx={{ marginTop: '16px' }}>
              Fechar
            </Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileComponent;
