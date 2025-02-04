// path: src/components/profile/QRCodeSection.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const QRCodeSection = ({ userData, textColor, paperColor }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" sx={{ marginBottom: "16px", color: textColor }}>
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
  );
};

export default QRCodeSection;

