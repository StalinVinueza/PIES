import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <div className="container-fluid home d-flex align-items-center justify-content-center">
      <div className="home-content text-center p-4 shadow-lg rounded bg-white">
        <h1 className="display-4 fw-bold text-primary">Bienvenido a Eco-Shop</h1>
        <p className="lead text-muted">
          Descubre productos sostenibles, conoce nuestra historia y sé parte del cambio.
        </p>
        <button className="btn btn-danger btn-lg mt-3">Explorar Productos</button>
      </div>
    </div>
  );
}

export default Home;
