import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QRCode from 'react-qr-code';
import { Box, Avatar, Typography, Button, Tabs, Tab, TextField, Modal } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRScanner from './QRScanner';
import BasicModal from './BasicModal';
import { useNavigate } from 'react-router-dom';

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
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal básico
  const [modalText, setModalText] = useState('');
  const navigate = useNavigate();

  const handleScan = (data) => {
    setInputCode(data);
    setIsScannerOpen(false);
    handleSendConnection(data);
    setIsModalOpen(true);
    console.log('QR Code Lido:', data);
  };

  const handleSendConnection = (code) => {
    fetch("http://localhost:8080/api/connection/sendconnection", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSolicitante: userData.unique_code,
        idSolicitado: code,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Erro na requisição");
        }
        setModalTitle("Sucesso");
        setModalText(data.message);
        return data;
      })
      .then(() => {
        console.log("Conexão enviada com sucesso!");
      })
      .catch((error) => {
        setModalText(error.message)
      }).finally(()=>{
        setIsModalOpen(true);
      });
  };
  

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setIsAuthenticated(true);
    } else {
      // Redirecionar caso não autenticado
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
              <QRCode value={String(userData.unique_code)} size={255} />
            </Box>
            <p>Ou Digite o código: {userData.unique_code}</p>
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
            <QRScanner onScan={handleScan} />
            <Button onClick={() => setIsScannerOpen(false)} sx={{ marginTop: '16px' }}>
              Fechar Scanner
            </Button>
          </Box>
        </Modal>

        {/* Modal Básico */}

      </Box>
      <BasicModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
          description={modalText}
        />
    </ThemeProvider>
  );
};

export default ProfileComponent;
