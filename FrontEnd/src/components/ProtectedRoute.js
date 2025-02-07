import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente ProtectedRoute que protege las rutas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");  // Verifica si existe el token

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra el contenido de la ruta protegida
  return children;
};

export default ProtectedRoute;
