import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css'; 
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Imagen principal fuera de la clase home */}
      <div className="main-image">
        <img 
          src="/home.jpeg" 
          className="img-fluid w-100 main-image-size" 
          alt="Productos Agroecológicos"
        />
      </div>

      <div className="container-fluid home">
        {/* Título y descripción */}
        <div className="text-center mb-5">
          <h1>Bienvenidos a Eco Shop</h1>
          <p>Tu tienda ecológica en línea para un mundo más verde y sostenible.</p>
        </div>

        {/* Secciones de productos */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <img className="img-fluid product-image" src="/arandanos.jpeg" alt="Arándanos" />
          </div>
          <div className="col-md-6">
            <h1>Arándanos</h1>
            <p>Los arándanos son ricos en antioxidantes, mejoran la memoria, promueven la salud ocular y cardiovascular, ayudan a regular el azúcar en sangre y fortalecen el sistema inmunológico.</p>
          </div>
        </div>

        {/* Fila 2: Descripción a la izquierda y imagen a la derecha */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h1 className="text-start">Berenjena</h1> {/* Solo este título se alinea a la izquierda */}
            <p>La berenjena es rica en fibra, antioxidantes y vitaminas. Ayuda a mejorar la digestión, reducir el colesterol, controlar el azúcar en sangre y proteger la salud cardiovascular.</p>
          </div>
          <div className="col-md-6">
            <img
              className="img-fluid product-image"
              src="/berenjena.jpg"
              alt="Producto 2"
            />
          </div>
        </div>

        {/* Fila 3: Imagen a la izquierda y descripción a la derecha */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <img
              className="img-fluid product-image"
              src="/camu.jpg"
              alt="Camu"
            />
          </div>
          <div className="col-md-6">
            <h1>Camu Camu</h1>
            <p>Una fruta rica en vitamina C, incluso más que la naranja, y con propiedades antioxidantes. Ayuda a fortalecer el sistema inmunológico y a combatir el estrés.</p>
          </div>
        </div>

        {/* Botón para explorar productos */}
        <div className="text-center">
          <Link to="/productos">
            <button className="btn btn-primary btn-lg">Explorar Más Productos</button>
          </Link>
        </div>
      </div>

      {/* Footer (sin afectarse por la clase text-start) */}
      <footer className="text-center py-3">
        <p>&copy; 2025 Eco Shop. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default Home;
