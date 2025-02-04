import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  // Fallback para dados do localStorage se isLoading for false
  const localUser = JSON.parse(localStorage.getItem("user_data"));

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Usa user ou localUser para evitar null
  const currentUser = user || localUser;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
