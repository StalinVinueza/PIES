import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavMenu.css';

function NavMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado para verificar si el usuario está autenticado
  const navigate = useNavigate();  // Para redirigir al usuario

  // Verificar si hay un token almacenado en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);  // Si hay token, el usuario está autenticado
  }, []);

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem("token");  // Eliminar el token de localStorage
    localStorage.removeItem("usuario");  // Eliminar información adicional si es necesario
    setIsAuthenticated(false);  // Actualizar el estado
    navigate("/login");  // Redirigir a la página de login
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>

        {/* Botón Hamburguesa para móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            
            {/* Solo mostrar los siguientes enlaces si el usuario está autenticado */}
            {isAuthenticated && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/emprendimientos">Emprendimientos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/carrito">Carrito</Link></li>
              </>
            )}

            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            {!isAuthenticated && (
              <li className='nav-item'><Link className='nav-link' to='/registro'>Registro</Link></li>
            )}

            {/* Mostrar botón de logout si el usuario está autenticado */}
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
