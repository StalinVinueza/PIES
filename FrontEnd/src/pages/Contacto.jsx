import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ubicacion from '../components/Ubicacion'; 
import BotonWhatsApp from '../components/BotonWhatsApp'; 
import FormularioContacto from '../components/FormularioContacto'; 
import '../components/Contactos.css'; // Asegúrate de que este archivo exista en styles, no en components

function Contacto() {
  return (
    <div className="container contacto-container">
      <h1 className="text-center contacto-title">Contactos</h1>
      <p className="text-center contacto-description">Deseas más información, encuéntranos en nuestros canales oficiales</p>

      {/* Sección de dos columnas para Ubicación y Formulario */}
      <div className="row d-flex align-items-start">
        {/* Columna de Ubicación (Izquierda) */}
        <div className="col-md-6">
          <Ubicacion />
        </div>

        {/* Columna del Formulario (Derecha) */}
        <div className="col-md-6">
          <FormularioContacto />
        </div>
      </div>

      {/* Sección del Botón de WhatsApp */}
      <div className="row contacto-whatsapp">
        <div className="col text-center">
          <p className="fs-3">¿Tienes preguntas? Escríbenos por WhatsApp</p>
          <BotonWhatsApp />
        </div>
      </div>
    </div>
  );
}

export default Contacto;
