import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css'; 


function NavMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Enlace a la página de inicio */}
        </li>
        <li>
          <Link to="/contacto">Contacto</Link> {/* Enlace a la página de contacto */}
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;

