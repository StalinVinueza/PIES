// src/components/FooterEco.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'; // Importando FaXTwitter y FaYoutube
import './FooterEco.css';

const FooterEco = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        {/* Logo y Nombre */}
        <h2 className="footer-logo">Eco-Shop</h2>

        {/* Íconos de redes sociales */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a> {/* Nuevo logo X de Twitter */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a> {/* YouTube en vez de LinkedIn */}
        </div>

        {/* Derechos reservados */}
        <p className="footer-copy">&copy; 2025 Eco-Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default FooterEco;
