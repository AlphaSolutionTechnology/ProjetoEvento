import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const BasicModal = ({ open, title, text, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {text}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose} fullWidth>
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;
