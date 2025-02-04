//path: src/components/profile/ConnectionForm.jsx

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Typography from "@mui/material/Typography";

const ConnectionForm = ({ inputCode, setInputCode, handleSendConnection, setIsScannerOpen, darkMode, buttonColor }) => {
  return (
    <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
      <Typography
        variant="body1"
        sx={{ marginBottom: "16px", textAlign: "center", color: darkMode ? "#ffffff" : "#333333" }}
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
  );
};

export default ConnectionForm;
