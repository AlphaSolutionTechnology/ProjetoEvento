// path: src/components/profile/AvatarSection.jsx

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import useTheme from "../../hooks/useTheme";

const AvatarSection = ({ userData }) => {
  const { darkMode } = useTheme();
  const paperColor = darkMode ? "#1e1e1e" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#333333";

  return (
    <Box sx={{ textAlign: "center", marginBottom: "32px" }}>
      <Avatar
        sx={{
          width: { xs: 100, sm: 100 },
          height: { xs: 80, sm: 100 },
          margin: "auto",
          marginBottom: "16px",
          backgroundColor: darkMode ? paperColor : "#e0e0e0",
          color: darkMode ? textColor : "#757575",
        }}
      />
      <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}>
        {userData?.name || "Usuário"}
      </Typography>
    </Box>
  );
};

export default AvatarSection;

