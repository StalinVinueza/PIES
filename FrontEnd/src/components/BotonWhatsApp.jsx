import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaWhatsapp } from 'react-icons/fa'; 
import '../components/Contactos.css'; // Asegúrate de que este archivo exista

function BotonWhatsApp() {
  return (
    <a
      href="https://wa.me/593999999999" // Reemplaza con tu número en formato internacional
      className="btn btn-success whatsapp-btn d-flex align-items-center justify-content-center gap-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* <FaWhatsapp size={24} />  */}
      Enviar mensaje
    </a>
  );
}

export default BotonWhatsApp;
