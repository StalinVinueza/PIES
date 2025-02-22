import React from 'react';


function Ubicacion() {
  return (
    <div className="container mt-4 text-center">
      <h2>Ubicación</h2>
      <p>Nos encontramos en la Pontificia Universidad Católica del Ecuador (PUCE), un lugar comprometido con el bienestar social y el medio ambiente.</p>
          
      {/* Mapa de Google embebido */}
      <div className="map-responsive">
        <iframe
          title="Ubicación PUCE"
          width="100%"
          height="420"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.555795070853!2d-78.5295425!3d-0.2094901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a10b8c57123%3A0x7cc4dcd53937a7dd!2sPontificia%20Universidad%20Cat%C3%B3lica%20del%20Ecuador!5e0!3m2!1ses!2sec!4v1675200011225"
          allowFullScreen
        ></iframe>
      </div>
      
      <h3>Cómo llegar de manera ecológica</h3>
      <p>Te invitamos a llegar en transporte sostenible como bicicleta, o en transporte público que minimice el impacto ambiental. Juntos podemos cuidar nuestro planeta. </p>
    </div>
  );
}

export default Ubicacion;
