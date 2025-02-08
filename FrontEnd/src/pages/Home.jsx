// Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../styles/Home.css'; // Asegúrate de tener los estilos adecuados en este archivo

function Home() {
  return (
    <div className="container-fluid home">
      {/* Imagen principal */}
      <div className="main-image mb-5">
        <img 
          src="/home.jpeg" 
          className="img-fluid w-100" 
          alt="Productos Agroecologicos"
        />
      </div>

      {/* Título y descripción */}
      <div className="text-center mb-5">
        <h1 className="display-4">Bienvenidos a Eco Shop</h1>
        <p className="lead">Tu tienda ecológica en línea para un mundo más verde y sostenible.</p>
      </div>

      {/* Carrusel de productos */}
      <div className="carousel-container text-center mb-5">
        <h2>Nuestros Productos</h2>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400/FFCC00/333333?text=Producto+1"
              alt="Producto 1"
            />
            <Carousel.Caption>
              <h3>Producto 1</h3>
              <p>Beneficio 1: Este producto es ecológico y sostenible, perfecto para tu hogar.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400/2D8A3E/FFFFFF?text=Producto+2"
              alt="Producto 2"
            />
            <Carousel.Caption>
              <h3>Producto 2</h3>
              <p>Beneficio 2: Ayuda a reducir el impacto ambiental, libre de químicos dañinos.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400/FFAA33/333333?text=Producto+3"
              alt="Producto 3"
            />
            <Carousel.Caption>
              <h3>Producto 3</h3>
              <p>Beneficio 3: Ahorra energía y es totalmente biodegradable.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Botón para explorar productos */}
      <div className="text-center">
        <button className="btn btn-primary btn-lg">Explorar Más Productos</button>
      </div>

      {/* Sección de contacto o información adicional */}
      <div className="info-section text-center mt-5">
        <h2>Contáctanos</h2>
        <p>Si tienes alguna pregunta o necesitas más información sobre nuestros productos, ¡estamos aquí para ayudarte!</p>
        <button className="btn btn-success btn-lg">Contáctanos</button>
      </div>
    </div>
  );
}

export default Home;
