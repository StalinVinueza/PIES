import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../components/Card'; // Asegúrate de que el nombre sea correcto y exista

function Nosotros() {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Nosotros</h2>
      <p className="text-muted text-center">
        Somos una empresa comprometida con la innovación y la sostenibilidad.
      </p>

      <div className="row mt-4 d-flex justify-content-center">
        <div className="col-md-4">
          <Card 
            title="Misión" 
            description="Ofrecer productos sostenibles para reducir la huella de carbono." 
            image="https://via.placeholder.com/150"
          />
        </div>
        <div className="col-md-4">
          <Card 
            title="Visión" 
            description="Ser líderes en el mercado ecológico y sostenible." 
            image="https://via.placeholder.com/150"
          />
        </div>
        <div className="col-md-4">
          <Card 
            title="Valores" 
            description="Innovación, sostenibilidad y responsabilidad social." 
            image="https://via.placeholder.com/150"
          />
        </div>
      </div>
    </div>
  );
}

export default Nosotros; // ✅ Asegúrate de que esta línea esté FUERA de la función
