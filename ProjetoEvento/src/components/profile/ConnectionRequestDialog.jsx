// path: src/components/profile/ConnectionRequestDialog.jsx

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const ConnectionRequestDialog = ({ isDialogOpen, dialogData, handleAcceptConnection, handleDeclineConnection }) => {
  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>{"Nova Solicitação de Conexão"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogData?.fromUserName || "Um usuário"} quer se conectar com você.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeclineConnection}>Recusar</Button>
        <Button onClick={handleAcceptConnection} autoFocus>Aceitar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectionRequestDialog;
