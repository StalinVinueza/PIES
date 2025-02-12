import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const videos = [
    { src: '/Vbambu.mp4', alt: 'Video 1' },
    { src: '/Vcampo.mp4', alt: 'Video 2' },
    { src: '/Vhuevos.mp4', alt: 'Video 3' },
    { src: '/Vtextil.mp4', alt: 'Video 4' },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoCarouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000); // Cambia de video cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sección de video ocupando toda la pantalla */}
      <div className="fullscreen-video">
        <video
          ref={videoCarouselRef}
          key={videos[currentVideo].src}
          src={videos[currentVideo].src}
          alt={videos[currentVideo].alt}
          autoPlay
          muted
          loop
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
            <h1 className="text-end">BERENJENAS</h1>
            <p className="text-end">La berenjena es rica en fibra, antioxidantes y vitaminas. Ayuda a mejorar la digestión, 
              reducir el colesterol, controlar el azúcar en sangre y proteger la salud cardiovascular.</p>
          </div>
          <div className="col-md-6">
            <img className="img-fluid product-image" src="/berenjena.jpg" alt="Berenjena" />
          </div>
        </div>

        {/* Fila 3: Imagen a la izquierda y descripción a la derecha */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <img className="img-fluid product-image" src="/camu.jpg" alt="Camu" />
          </div>
          <div className="col-md-6">
            <h1>CAMU-CAMU</h1>
            <p>Una fruta rica en vitamina C, incluso más que la naranja, y con propiedades antioxidantes. Ayuda a fortalecer el sistema inmunológico y a combatir el estrés.</p>
          </div>
        </div>

        {/* Botón para redirigir a la página de registro */}
        <div className="signup-link text-center">
          <p>¿No tienes tu cuenta? <Link to="/registro">Crear cuenta</Link></p>
        </div>
      </div>
    </>
  );
}

export default Home;
