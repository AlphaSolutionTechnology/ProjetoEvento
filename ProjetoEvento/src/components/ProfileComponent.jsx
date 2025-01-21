import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QRCode from 'react-qr-code';
import { Box, Avatar, Typography, Button, Tabs, Tab, TextField, Modal } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRScanner from './QRScanner';
import BasicModal from './BasicModal';

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
  const localId = JSON.parse(localStorage.getItem('user_data')).unique_code;

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
        idSolicitante: localId,
        idSolicitado: code,
      }),
    })
      .then(async (response) => {
        const data = await response.json(); // Aguarda o corpo da resposta
        if (!response.ok) {
          throw new Error(data.message || "Erro na requisição"); // Usa a mensagem da resposta se disponível
        }
        setModalTitle("Sucesso");
        return data;
      })
      .then(() => {
        setIsModalOpen(true);
        console.log("Conexão enviada com sucesso!");
      })
      .catch((error) => {
        setModalText(error.message)
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
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          height: '100vh',
          
        })}
      >
        {/* Avatar e informações */}
        <Avatar
          src="https://via.placeholder.com/150"
          alt={name || 'Carregando'}
          sx={{
            width: 100,
            height: 100,
            marginBottom: '16px',
          }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          }}
        >
          {name || 'Carregando...'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: '8px',
            fontSize: { xs: '0.9rem', sm: '0.9rem', md: '1rem' },
          }}
        >
          Usuário
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          Escaneie o QR Code
        </Typography>

        {/* QR Code */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            padding: '20px',
            borderRadius: '8px',
            marginTop: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '250px',
            width: { xs: '80%', sm: '50%', md: '200px' },
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <QRCode value="https://example.com/yehor-haiduk" size={180} />
        </Box>

        {/* Botões */}
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            marginTop: '24px',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <Typography className="ortext" sx={{ textAlign: 'center' }}>
            Ou compartilhe o código:
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              flex: 1,
              padding: '10px',
            }}
          >
            Escanear QR code
          </Button>
          <Box
            component="form"
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'orange' },
              '& .MuiInput-underline:after': { borderBottomColor: 'orange' },
              '& > :not(style)': { width: '100%' },
              backgroundColor: 'white',
            }}
            noValidate
            autoComplete="off"
          >
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
