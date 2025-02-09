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
        <h1 className="main-title">Bienvenidos a Eco Shop</h1>
        <p>"Somos una tienda virtual dedicada a ofrecer productos sostenibles y amigables con el medio ambiente. Nos enfocamos en promover un consumo responsable,
          proporcionando a nuestros clientes opciones naturales y libres de químicos". </p>
        </div>

        {/* Secciones de productos */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <img className="img-fluid product-image" src="/arandanos.jpeg" alt="Arándanos" />
          </div>
          <div className="col-md-6">
            <h1>ARÁNDANOS</h1>
            <p>Los arándanos son ricos en antioxidantes, mejoran la memoria, promueven la salud ocular y cardiovascular,
               ayudan a regular el azúcar en sangre y fortalecen el sistema inmunológico.</p>
          </div>
        </div>

        {/* Fila 2: Descripción a la izquierda y imagen a la derecha */}
        <div className="row mb-5 align-items-end">
          <div className="col-md-6">
            <h1 className="text-end">BERENGENAS</h1> {/* Solo este título se alinea a la izquierda */}
            <p className="text-end">La berenjena es rica en fibra, antioxidantes y vitaminas. Ayuda a mejorar la digestión, 
              reducir el colesterol, controlar el azúcar en sangre y proteger la salud cardiovascular.</p>
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
            <h1>CAMU-CAMU</h1>
            <p>Una fruta rica en vitamina C, incluso más que la naranja, y con propiedades antioxidantes. Ayuda a fortalecer el sistema inmunológico y a combatir el estrés.</p>
          </div>
        </div>

        {/* Botón para redirigir a la página de registro */}
              <div className="signup-link">
                <p>¿No tienes tu cuenta? <Link to="/registro">Crear cuenta</Link></p>
              </div>
      </div>

      {/* Footer (sin afectarse por la clase text-start) */}
    </>
  );
}

export default Home;
