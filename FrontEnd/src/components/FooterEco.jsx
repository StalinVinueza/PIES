import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const FooterEco = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Primera columna: Logo */}
          <div className="col-md-3 text-center text-md-left">
            <a href="/">
              <img src="logo.png" alt="Eco-Shop Logo" style={{ width: '120px' }} />
            </a>
          </div>

          {/* Segunda columna: Navegación */}
          <div className="col-md-3 text-center">
            <ul className="list-unstyled">
              <li><a href="/productos">Productos</a></li>
              <li><a href="/contacto">Contactos</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/registro">Registrate</a></li>
            </ul>
          </div>

          {/* Tercera columna: Información de contacto */}
          <div className="col-md-3 text-center">
            <p>Teléfonos: <br /> 098-0128-824  <br /> 099-8235-229</p>
            <p>Email: <br /> pucetec@ecoshop.com</p>
          </div>

          {/* Cuarta columna: Redes sociales */}
          <div className="col-md-3 text-center">
            <div className="social-icons d-flex justify-content-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Derechos reservados y enlaces en una sola línea */}
        <div className="footer-bottom">
          <p>&copy; 2025 Eco-Shop. Todos los derechos reservados</p>
          <span>|</span>
          <a href="/politicas-privacidad">Políticas de privacidad y cookies</a>
          <span>|</span>
          <a href="/politicas-reembolsos">Políticas de devoluciones y reembolsos</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterEco;