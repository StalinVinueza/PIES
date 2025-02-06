import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ title, description, image }) {
  return (
    <div className="card h-100 shadow-sm"> {/* h-100 asegura que todas tengan la misma altura */}
      {image && <img src={image} className="card-img-top" alt={title} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description}</p> {/* Hace que todas las tarjetas tengan el mismo tamaño */}
      </div>
    </div>
  );
}

export default Card;
