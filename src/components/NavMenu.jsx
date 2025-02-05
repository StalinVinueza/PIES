import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Importamos el icono de usuario
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavMenu.css'; // Asegúrate de enlazar el CSS si tienes estilos personalizados

function NavMenu() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/clientes">Clientes</Link> </li>
        <li><Link to="/emprendimientos">Emprendimientos</Link> </li>
        <li><Link to="/contacto">Contacto</Link> </li>
      </ul>
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Logo (redirige al inicio) */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Eco-Shop
        </Link>

        {/* Botón Hamburguesa */}
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

        {/* Menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li> 
            <li className="nav-item"><Link className="nav-link" to="#">Emprendimientos</Link></li> 
            <li className="nav-item"><Link className="nav-link" to="#">Productos</Link></li> 
            
            {/* Icono de Usuario en lugar de "Iniciar Sesión" */}
            <li className="nav-item">
              <Link className="nav-link user-icon" to="/login">
                <FaUser size={22} className="text-dark" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
