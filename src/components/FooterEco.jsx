// src/components/Footer.js
import React from 'react';
import './FooterEco.css'; // Asegúrate de importar el archivo CSS para el footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Eco-Shop. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="/terms">Términos y condiciones</a></li>
          <li><a href="/privacy">Política de privacidad</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
