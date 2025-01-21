import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Box, Avatar, Typography, Button, Tabs, Tab, TextField, Modal, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRScanner from './QRScanner';
import BasicModal from './BasicModal';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

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
  const { darkMode } = useTheme();

  const backgroundColor = darkMode ? '#121212' : '#f5f5f5';
  const paperColor = darkMode ? '#1e1e1e' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const buttonColor = darkMode ? '#bb86fc' : '#3f51b5';

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
      }).finally(() => {
        setIsModalOpen(true);
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setIsAuthenticated(true);
    } else {
      navigate("/googletest");
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor }}>
        <Typography variant="h6" sx={{ color: textColor }}>Verificando autenticação...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: '8px', sm: '16px' }, backgroundColor, height: '100vh', color: textColor }}>
      {/* Contêiner principal da página */}
  
      <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
        {/* Avatar e Nome do Usuário */}
        <Avatar 
          sx={{ 
            width: { xs: 80, sm: 100 }, 
            height: { xs: 80, sm: 100 }, 
            margin: 'auto', 
            marginBottom: '16px', 
            backgroundColor: darkMode ? paperColor : '#e0e0e0', // Cor de fundo ajustada para modo claro
            color: darkMode ? textColor : '#757575', // Ajuste da cor do ícone no modo claro
          }}
        />

        {/* Nome do usuário ou "Usuário" como padrão */}
        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
          {userData?.name || "Usuário"}
        </Typography>
      </Box>
  
      {/* Tabs para alternar entre as abas */}
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
        {/* Aba que exibe o QR Code */}
        <Tab label="Conectar" />
        {/* Aba que permite inserir ou escanear códigos */}
      </Tabs>
  
      {/* Conteúdo da aba "Meu QR Code" */}
      {activeTab === 0 && (
        <Box sx={{ textAlign: 'center' }}>
          {/* Texto explicativo */}
          <Typography variant="body1" sx={{ marginBottom: '16px', color: textColor }}>
            Escaneie este QR Code para se conectar comigo.
          </Typography>
          {/* QR Code gerado dinamicamente */}
          <Box
            sx={{
              backgroundColor: paperColor,
              padding: '16px',
              borderRadius: '8px',
              display: 'inline-block',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <QRCode value={String(userData.unique_code)} size={255} />
          </Box>
          {/* Código numérico como alternativa ao QR Code */}
          <Typography variant="body2" sx={{ marginTop: '16px' }}>
            Ou Digite o código: {userData.unique_code}
          </Typography>
        </Box>
      )}
  
      {/* Conteúdo da aba "Conectar" */}
      {activeTab === 1 && (
        <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Texto explicativo */}
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center', color: textColor }}>
            Digite o código do usuário ou escaneie um QR Code para se conectar.
          </Typography>
          {/* Botão para abrir o scanner de QR Code */}
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
          {/* Input para inserir código manualmente */}
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
              '.MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? '#757575' : '#c4c4c4', 
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#ffffff' : '#000000', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: buttonColor, 
                },
              },
              '.MuiInputLabel-root': {
                color: darkMode ? '#ffffff' : textColor, 
              },
              input: {
                color: darkMode ? '#ffffff' : textColor, 
              },
            }}
          />

          {/* Botão para enviar o código inserido */}
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            fullWidth
            onClick={() => handleSendConnection(inputCode)}
            disabled={!inputCode}
            sx={{
              backgroundColor: darkMode ? buttonColor : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
              '&:hover': {
                backgroundColor: darkMode ? '#9a67ea' : '#f5f5f5',
              },
              '&.Mui-disabled': {
                backgroundColor: darkMode ? '#424242' : '#e0e0e0',
                color: darkMode ? '#9e9e9e' : '#9e9e9e',
              },
            }}
          >
            Conectar
          </Button>
        </Box>
      )}
  
      {/* Modal para scanner de QR Code */}
      <Modal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }}>
          <QRScanner onScan={handleScan} />
        </Box>
      </Modal>

      {/* Modal básico */}
      <BasicModal
        open={isModalOpen}
        title={modalTitle}
        text={modalText}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default ProfileComponent;
