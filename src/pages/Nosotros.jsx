import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nosotros.css';
import Card from '../components/Card';

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

function Nosotros() {
  
}

export default Nosotros;
