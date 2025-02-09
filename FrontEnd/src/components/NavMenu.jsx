import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavMenu.css';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

function NavMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setIsAuthenticated(!!token);
    setUserProfile(usuario ? usuario.perfilId : null); // Asegúrate de que perfilId esté correctamente asignado
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    setUserProfile(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
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
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

            {/* Mostrar pestañas según el perfil del usuario */}
            {isAuthenticated && userProfile === 1 && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/emprendimientos">Emprendimientos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
              </>
            )}

            {isAuthenticated && userProfile === 3 && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/emprendimientos">Emprendimientos</Link></li>
                
                <li className="nav-item"><Link className="nav-link" to="/carrito">Carrito</Link></li>
              </>
            )}

            {/* Pestañas públicas */}
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>

            {/* Mostrar registro solo si no está autenticado */}
            {!isAuthenticated && (
              <li className="nav-item"><Link className="nav-link" to="/registro">Registro</Link></li>
            )}

            {/* Mostrar ícono de login o logout según autenticación */}
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