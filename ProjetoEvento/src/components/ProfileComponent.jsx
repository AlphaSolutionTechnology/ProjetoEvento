import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QRCode from 'react-qr-code';
import { Box, Avatar, Typography, Button, TextField } from '@mui/material';

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

function ProfileComponent() {
  const [name, setName] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        })}
      >
        {/* Avatar e informações */}
        <Avatar
          src="https://via.placeholder.com/150"
          alt={name || 'Carregando'}
          sx={{
            width: { xs: 64, sm: 80, md: 100 },
            height: { xs: 64, sm: 80, md: 100 },
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
            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
          }}
        >
          Usuário
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '8px' }}>
          Escaneie o QR Code
        </Typography>

        {/* QR Code */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            padding: '16px',
            borderRadius: '8px',
            marginTop: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '200px',
            width: { xs: '80%', sm: '50%', md: '200px' },
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <QRCode value="https://example.com/yehor-haiduk" size={128} />
        </Box>

        {/* Botões */}
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            marginTop: '24px',
            flexDirection: { xs: 'column', sm: 'row' },
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
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Inserir Código"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ProfileComponent;
