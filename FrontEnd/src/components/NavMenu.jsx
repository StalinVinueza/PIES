import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavMenu.css';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';  // Importamos los íconos

function NavMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    navigate("/login");
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
              <li className="nav-item"><Link className="nav-link" to="/registro">Registro</Link></li>
            )}

            {isAuthenticated ? (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0 }}>
                  <FaSignOutAlt size={20} title="Cerrar sesión" />
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FaUser size={20} title="Iniciar sesión" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
