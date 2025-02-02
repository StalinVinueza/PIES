import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css'; 


function NavMenu() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/clientes">Clientes</Link> </li>
        <li><Link to="/contacto">Contacto</Link> </li>
      </ul>
    </nav>
  );
}

export default NavMenu;

