import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredProfile }) => {
  const isAuthenticated = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredProfile && usuario.es_cli_perfil_id !== requiredProfile) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;