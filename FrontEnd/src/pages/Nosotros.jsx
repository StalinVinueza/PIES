import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Nosotros.css';
import Card from '../components/CardNosotros';

function Nosotros() {
  return (
    <div className="container mt-5">
      <h1 className="text-muted text-center">
        Comprometidos con el planeta y la sostenibilidad.
      </h1>

      <div className="row align-items-center">
  <div className="col-md-6">
    <img className="img-fluid" src="/mision.jpg" alt="Misión" />
  </div>
  <div className="col-md-6">
    <h1>MISIÓN</h1>
    <p>
      Nuestra misión es proporcionar productos naturales y sostenibles que fomenten el bienestar 
      de las personas y el respeto por el medio ambiente. A través de alianzas con emprendedores 
      comprometidos con la ecología, buscamos reducir la huella de carbono y ofrecer alternativas 
      saludables y responsables para la vida cotidiana.
    </p>
    <p>
      Creemos en la importancia de un consumo consciente, donde cada elección contribuya 
      a la preservación del planeta. Por ello, trabajamos para garantizar productos de calidad, 
      sin químicos dañinos, y con procesos de producción que respetan la biodiversidad y 
      apoyan la economía local.
    </p>
  </div>
</div>

<div className="row align-items-center">
  <div className="col-md-6 order-md-2">
    <img className="img-fluid" src="/vision.jpg" alt="Visión" />
  </div>
  <div className="col-md-6 order-md-1">
    <h1>VISIÓN</h1>
    <p>
      Nuestra visión es ser una plataforma líder en la promoción de un mercado sostenible, 
      convirtiéndonos en el referente para consumidores que buscan opciones responsables con 
      la salud y el medio ambiente. Queremos expandir nuestra comunidad de emprendedores ecológicos 
      y fomentar un cambio cultural hacia un estilo de vida más sustentable.
    </p>
    <p>
      Nos proyectamos como una comunidad global que inspira y educa a las personas sobre 
      la importancia de adoptar hábitos de consumo respetuosos con la naturaleza, impulsando 
      soluciones innovadoras que permitan un desarrollo sostenible para las futuras generaciones.
    </p>
  </div>
</div>

<div className="row align-items-center">
  <div className="col-md-6">
    <img className="img-fluid" src="/valores.jpg" alt="Valores" />
  </div>
  <div className="col-md-6">
    <h1>VALORES</h1>
    <p>
      Nos basamos en principios fundamentales que guían nuestro propósito y forma de trabajar:
    </p>
    <ul>
      <li><strong>Responsabilidad ambiental:</strong> Cada decisión que tomamos busca minimizar el impacto ambiental y promover la sostenibilidad.</li>
      <li><strong>Innovación:</strong> Nos esforzamos por ofrecer productos y servicios que generen un impacto positivo en la calidad de vida de las personas.</li>
      <li><strong>Compromiso con la salud y el bienestar:</strong> Creemos en productos naturales y procesos que beneficien tanto al consumidor como al entorno.</li>
      <li><strong>Apoyo a emprendedores:</strong> Trabajamos junto a pequeños productores y negocios sostenibles para crear una economía más justa.</li>
    </ul>
  </div>
</div>

      {/* Nuevo espacio para "Nuestro equipo" */}
      <div className="container mt-5">
        <h1 className="text-muted text-center">
          Nuestro Equipo
        </h1>

        <div className="row mt-4">
          <div className="col-md-6">
            <Card 
              title="Stalin Vinueza" 
              description="Especialista en sostenibilidad y desarrollo de productos." 
              image="/stalin.jpg"
            />
          </div>
          <div className="col-md-6">
            <Card 
              title="Pedro Tamayo" 
              description="Encargado de la innovación en procesos ecológicos." 
              image="/pedro.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
