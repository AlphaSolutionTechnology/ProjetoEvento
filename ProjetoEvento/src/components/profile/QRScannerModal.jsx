// path: src/components/profile/QRScannerModal.jsx

import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import QRScanner from "../QRScanner";

const QRScannerModal = ({ isScannerOpen, setIsScannerOpen, handleScan, darkMode }) => {
  return (
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
  );
};

export default QRScannerModal;
