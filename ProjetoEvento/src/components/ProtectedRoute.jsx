import React from 'react';
import {Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();

    // se o usuario nao esta autenticado ou nao tem o papel necessario, redireciona para a pagina de login
    if (!user || user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;