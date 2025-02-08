import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Nosotros.css';
import Card from '../components/CardNosotros';

function Nosotros() {
  return (
    <div className="container mt-5">
      <h1 className="text-muted text-center">
        Comprometidos con el planeta y la sostenibilidad.
      </h1>

      <div className="row mt-4">
        <div className="col-md-4">
          <Card 
            title="Misión" 
            description="Ofrecer productos sostenibles para reducir la huella de carbono." 
            image="/mision.jpg"
          />
        </div>
        <div className="col">
          <Card 
            title="Visión" 
            description="Ser líderes en el mercado ecológico y sostenible." 
            image="/vision.jpg"
          />
        </div>
        <div className="col">
          <Card 
            title="Valores" 
            description="Innovación, sostenibilidad y responsabilidad social." 
            image="/valores.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Nosotros; // ✅ Asegúrate de que esta línea esté FUERA de la función
