import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NavMenu.css';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

function NavMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setIsAuthenticated(!!token);
    setUserProfile(usuario ? usuario.perfilId : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    setUserProfile(null);
    navigate("/login");
  };

  // Función para manejar el scroll hacia arriba
  const handleNavClick = () => {
    window.scrollTo(0, 0); // Mover al inicio de la página
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={handleNavClick}>
          <img src="/logo.png" alt="Logo" />
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavClick}>Inicio</Link>
            </li>

            {isAuthenticated && userProfile === 1 && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/clientes" onClick={handleNavClick}>Clientes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/emprendimientos" onClick={handleNavClick}>Emprendimientos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/productos" onClick={handleNavClick}>Productos</Link></li>
              </>
            )}

            {isAuthenticated && userProfile === 3 && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/emprendimientos" onClick={handleNavClick}>Emprendimientos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/carrito" onClick={handleNavClick}>Carrito</Link></li>
              </>
            )}

            {isAuthenticated && userProfile === 4 && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/emprendimientos" onClick={handleNavClick}>Emprendimientos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/productos" onClick={handleNavClick}>Productos</Link></li>
              </>
            )}

            <li className="nav-item"><Link className="nav-link" to="/contacto" onClick={handleNavClick}>Contactos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros" onClick={handleNavClick}>Nosotros</Link></li>

            {isAuthenticated ? (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0 }}>
                  <FaSignOutAlt size={20} title="Cerrar sesión" />
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleNavClick}>
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
