import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  const videos = [
    { src: "/Vbambu.mp4", alt: "Video 1" },
    { src: "/Vcampo.mp4", alt: "Video 2" },
    { src: "/Vhuevos.mp4", alt: "Video 3" },
    { src: "/Vtextil.mp4", alt: "Video 4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Cambia de video cada 5 segundos

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <>
      {/* Sección del carrusel de videos */}
      <div className="video-carousel">
        {videos.map((video, index) => (
          <video
            key={index}
            className={`video ${index === currentIndex ? "active" : ""}`}
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            alt={video.alt}
          />
        ))}
        {/* Texto superpuesto */}
        <div className="overlay-text">
          <h1 className="main-title">Bienvenidos a Eco Shop</h1>
          <p>
            "Somos una tienda virtual dedicada a ofrecer productos sostenibles y
            amigables con el medio ambiente. Nos enfocamos en promover un consumo
            responsable, proporcionando a nuestros clientes opciones naturales y
            libres de químicos".
          </p>
        </div>
      </div>

      <div className="container home">
    

        {/* Secciones de productos */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <img className="img-fluid product-image" src="/arandanos.jpeg" alt="Arándanos" />
          </div>
          <div className="col-md-6">
            <h1>ARÁNDANOS</h1>
            <p>
              Los arándanos son ricos en antioxidantes, mejoran la memoria, promueven la
              salud ocular y cardiovascular, ayudan a regular el azúcar en sangre y
              fortalecen el sistema inmunológico.
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <img className="img-fluid product-image" src="/berenjena.jpg" alt="Berenjena" />
          </div>
          <div className="col-md-6 order-md-1">
            <h1>BERENJENAS</h1>
            <p>
              La berenjena es rica en fibra, antioxidantes y vitaminas. Ayuda a mejorar la
              digestión, reducir el colesterol, controlar el azúcar en sangre y proteger la
              salud cardiovascular.
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <img className="img-fluid product-image" src="/camu.jpg" alt="Camu" />
          </div>
          <div className="col-md-6">
            <h1>CAMU-CAMU</h1>
            <p>
              Una fruta rica en vitamina C, incluso más que la naranja, y con propiedades
              antioxidantes. Ayuda a fortalecer el sistema inmunológico y a combatir el
              estrés.
            </p>
          </div>
        </div>

        {/* Botón para redirigir a la página de registro */}
        <div className="signup-link text-center">
          <p>
            ¿No tienes tu cuenta? <Link to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
