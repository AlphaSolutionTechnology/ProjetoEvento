import React, { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { WebSocketContext } from "../../context/WebSocketContext";

export default function NotificationButton() {
  const { messages } = useContext(WebSocketContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [animateBadge, setAnimateBadge] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user_data")).unique_code;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = (userId) => {
    console.log("Notificação confirmada para quem veio de:", userId);
  
    setNotifications((prev) =>
      prev.filter((notification) => notification.userId !== userId)
    );
  
    fetch("http://localhost:8080/api/connection/answerconnectionrequest", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        to: JSON.parse(localStorage.getItem("user_data")).unique_code,
        from: userId, // Aceitando a requisição que veio de userId
        status: "ACCEPTED",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta da API:", data);
      })
      .catch((error) => {
        console.error("Erro ao enviar a resposta:", error);
      });
  };
  

  const handleDeny = (userId) => {
    console.log("Notificação negada para quem veio de:", userId);
  
    setNotifications((prev) =>
      prev.filter((notification) => notification.userId !== userId)
    );
  
    fetch("http://localhost:8080/api/connection/answerconnectionrequest", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        to: JSON.parse(localStorage.getItem("user_data")).unique_code,
        from: userId,
        status: "DECLINED",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta da API:", data);
      })
      .catch((error) => {
        console.error("Erro ao enviar a resposta:", error);
      });
  };
  

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];
      const currentUser = JSON.parse(localStorage.getItem("user_data")).unique_code;
  
      // Exemplo: checa se a mensagem tem 'name' e é endereçada a mim
      if (newMessage.name && newMessage.to === currentUser) {
        setNotifications((prev) => {
          // Checa se já existe uma notificação para esse "from"
          const isDuplicate = prev.some((notification) => {
            return notification.userId === newMessage.from;
          });
  
          if (!isDuplicate) {
            // Aqui, vamos adicionar a propriedade "userId" = "from"
            // para padronizar como você trata lá em handleConfirm/handleDeny
            return [...prev, { ...newMessage, userId: newMessage.from }];
          }
  
          return prev;
        });
  
        // Animação do sino
        setAnimateBadge(true);
        setTimeout(() => setAnimateBadge(false), 1000);
      } else {
        console.log("Mensagem de sucesso ou inválida ignorada:", newMessage);
      }
    }
  }, [messages]);
  

  // Efeito para buscar notificações iniciais via GET
  useEffect(() => {
    fetch("http://localhost:8080/api/connection/retrieveconnectionrequest", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.server) {
          setNotifications((prev) => {
            // Remove possíveis duplicadas no carregamento inicial
            const uniqueNotifications = data.server.filter(
              (notification) =>
                !prev.some((n) => n.userId === notification.userId)
            );
            return [...prev, ...uniqueNotifications];
          });
        }
      })
      .catch((error) => console.error("Erro ao buscar notificações:", error));
  }, []);

  return (
    <div>
      <Badge
        badgeContent={notifications.length}
        color="error"
        className={animateBadge ? "tilt-animation" : ""}
      >
        <IconButton
          color="primary"
          aria-label="notifications"
          onClick={handleClick}
        >
          <NotificationsIcon />
        </IconButton>
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Título no topo do menu */}
        <Box sx={{ padding: "8px 16px", borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Pedido de Conexão
          </Typography>
        </Box>

        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem key={notification.userId || index}>
              <Box display="flex" alignItems="center" width="100%">
                <ListItemAvatar>
                  <Avatar>{notification.name?.charAt(0) || "?"}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.name?.split(" ")[0] || "Desconhecido"}
                  secondary={notification.name?.split(" ")[1] || ""}
                />
                <Box marginRight="15px" display="flex" gap={1} ml="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirm(notification.userId);
                    }}
                  >
                    Aceitar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeny(notification.userId);
                    }}
                  >
                    Negar
                  </Button>
                </Box>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>Nenhuma notificação</MenuItem>
        )}
      </Menu>
    </div>
  );
}
