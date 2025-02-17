import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeedbackDialog({ message }) {
  // Se não houver mensagem, não renderiza nada (como no componente original)
  if (!message) return null;

  // O diálogo inicia aberto, já que há uma mensagem para exibir
  const [open, setOpen] = React.useState(true);

  // Define se a mensagem é de sucesso (mantém a lógica do componente original)
  const isSuccess = message.toLowerCase().includes("sucesso");
  const title = isSuccess ? "Sucesso" : "Atenção";

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="feedback-dialog-description"
    >
      <DialogTitle style={{ color: isSuccess ? "green" : "red" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="feedback-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
