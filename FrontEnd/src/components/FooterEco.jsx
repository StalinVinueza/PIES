// src/components/FooterEco.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FooterEco.css'; // Asegúrate de que este CSS tenga los estilos adicionales necesarios
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'; // Importa iconos

const FooterEco = () => {
  return (
    <footer className="footer bg-teal text-white pt-5">
      <div className="container">
        <div className="row">
          {/* Primera columna: Logo */}
          <div className="col-md-4 text-center text-md-left mb-1">
            <p className="mt-2">
              <a href="/">
                <img src="logo.png" alt="Eco-Shop Logo" style={{ width: '120px' }} />
              </a>
            </p>
          </div>

          {/* Segunda columna: Navegación */}
          <div className="col-md-4 text-center text-md-left mb-4">
            <ul className="list-unstyled mt-3">
              <li><a href="/nosotros" className="footer-link d-block">Nosotros</a></li>
              <li><a href="/productos" className="footer-link d-block">Productos</a></li>
              <li><a href="/contacto" className="footer-link d-block">Contactos</a></li>
            </ul>
          </div>

          {/* Tercera columna: Información de contacto y redes sociales */}
          <div className="col-md-4 text-center text-md-start">
            <p className="mt-3 mb-1">Teléfonos: 098-0128-824 / 099-8235-229</p>
            <p>Email: snusnus@ecoshop.com</p>
            <div className="social-icons d-flex justify-content-start mt-3">
              <a href="https://instagram.com" className="footer-link me-3" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://facebook.com" className="footer-link me-3" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://tiktok.com" className="footer-link me-3" target="_blank" rel="noopener noreferrer">
                <FaTiktok size={24} />
              </a>
              <a href="https://wa.me/" className="footer-link" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="row mt-4 pt-4 border-top border-white">
          <div className="col text-center">
            <p className="mb-1">&copy; 2025 Eco-Shop. Todos los derechos reservados.</p>
            <div>
              <a href="/politicas-privacidad" className="footer-link">Políticas de privacidad y cookies</a>
              <span className="mx-2">|</span>
              <a href="/politicas-devoluciones-reembolsos" className="footer-link">Políticas de devoluciones y reembolsos</a>
            </div>
          </div>
        </div>
      </div>
    
    </footer>
  );
};

export default FooterEco;
