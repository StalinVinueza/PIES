import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Contactos.css';

function BotonWhatsApp() {
  return (
    <a
      href="https://wa.me/593994926633"
      className="whatsapp-btn" // Ahora aplicamos la clase de CSS
      target="_blank"
      rel="noopener noreferrer"
    >
      Enviar mensaje
    </a>
  );
}

export default BotonWhatsApp;
