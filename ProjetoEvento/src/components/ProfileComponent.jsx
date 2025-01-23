import React, { useState, useEffect, useContext } from 'react';
import QRCode from 'react-qr-code';
import { Box, Avatar, Typography, Button, Tabs, Tab, TextField, Modal } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRScanner from './QRScanner';
import BasicModal from './BasicModal';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { WebSocketContext } from '../context/WebSocketContext'; // Importa o WebSocketContext

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
  const { sendMessage, messages } = useContext(WebSocketContext); // Obtém o WebSocketContext

  const backgroundColor = darkMode ? '#121212' : '#f5f5f5';
  const paperColor = darkMode ? '#1e1e1e' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const buttonColor = darkMode ? '#bb86fc' : '#3f51b5';

  const handleScan = (data) => {
    setInputCode(data);
    setIsScannerOpen(false);
    handleSendConnection(data);
    console.log('QR Code Lido:', data);
  };

  const handleSendConnection = (code) => {
    if (!code) return;
    sendMessage('/app/sendrequest', {
      to: code, // ID do usuário solicitado
    });
    setModalTitle('Solicitação Enviada');
    setModalText(`Sua solicitação foi enviada para o usuário: ${code}`);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setIsAuthenticated(true);
    } else {
      navigate('/home');
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setModalTitle('Nova Notificação');
      setModalText(lastMessage.message || 'Você tem uma nova notificação!');
      setIsModalOpen(true);
    }
  }, [messages]);

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
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
            }}
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
          <QRScanner onScan={handleScan} />
        </Box>
      </Modal>

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