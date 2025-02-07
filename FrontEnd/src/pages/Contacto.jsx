import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ubicacion from '../components/Ubicacion'; 
import BotonWhatsApp from '../components/BotonWhatsApp'; 
import FormularioContacto from '../components/FormularioContacto'; 
import '../components/Contactos.css'; 

function Contacto() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Contactos</h1>
      <p className="text-center">Deseas más información, encuéntranos en nuestros canales oficiales</p>

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
      <div className="row mt-4">
        <div className="col text-center">
          <p className="fs-3">Escríbenos, ¡Te contactaremos de inmediato! ✉️🚀</p>
          <BotonWhatsApp />
        </div>
      </div>
    </div>
  );
}

export default Contacto;
