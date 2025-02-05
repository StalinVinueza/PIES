import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../components/CardNosotros';
import './Nosotros.css';

function Nosotros() {
  return (
    <div className="container mt-5">
      <h1 className="text-animated text-center">
        Somos una empresa comprometida con la innovación y la sostenibilidad.
      </h1>

      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        <div className="col">
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

export default Nosotros;
