import React from 'react';
import './NosotrosComponents.css';

export default function Equipo() {
  return (
    <section className="equipo-container">
      <h2>Nuestro Equipo</h2>
      <div className="equipo-grid">
        <div className="equipo-card">
          <img src="/personaje.webp" alt="Ana Pérez" />
          <h3>Ana Pérez</h3>
          <p>Fundadora & CEO</p>
        </div>
        <div className="equipo-card">
          <img src="/avatar2.jpg" alt="Juan López" />
          <h3>Juan López</h3>
          <p>Gerente de Operaciones</p>
        </div>
        <div className="equipo-card">
          <img src="/avatar3.jpg" alt="Carla Torres" />
          <h3>Carla Torres</h3>
          <p>Marketing & Ventas</p>
        </div>
      </div>
    </section>
  );
}
