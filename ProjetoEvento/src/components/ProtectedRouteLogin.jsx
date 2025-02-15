import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./loading/loading";

const ProtectedRouteLogin = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  // Fallback para dados do localStorage se isLoading for false
  const localUser = JSON.parse(localStorage.getItem("user_data"));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Usa user ou localUser para evitar null
  const currentUser = user || localUser;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  console.log(user);
  if (role && currentUser.role !== role) {
    alert("Você não tem permissão para acessar essa pagina!");
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRouteLogin;
