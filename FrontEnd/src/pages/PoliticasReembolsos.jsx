// src/pages/PoliticasReembolsos.jsx

import React from 'react';
import '../styles/Refund.css';  

function PoliticasReembolsos() {
  return (
    <div className="refund-page">
      <h1>Política de Devoluciones y Reembolsos</h1>
      <p>En Cambio Verde, confiamos en que nuestros productos superarán tus expectativas, pero entendemos que las circunstancias pueden variar. Con el compromiso de respaldar a nuestros clientes, ofrecemos una garantía de satisfacción de 8 días para todos los artículos adquiridos en nuestra tienda.</p>
      
      <h2>Condiciones de Devolución</h2>
      <ul>
        <li><strong>Producto dañado:</strong> Si el producto llega roto o manchado.</li>
        <li><strong>Producto incorrecto:</strong> Si el artículo recibido no coincide con el solicitado.</li>
        <li><strong>Instrucciones de cuidado:</strong> Si seguiste las instrucciones pero el producto no cumple con su propósito.</li>
        <li><strong>No mal uso:</strong> Si no hay signos de daño por accidentes o mal uso.</li>
      </ul>

      <h2>Opciones de Reembolso</h2>
      <p>Si cumples con las condiciones de devolución, podrás elegir entre:</p>
      <ul>
        <li><strong>Reembolso completo:</strong> Si devuelves el producto en el tiempo permitido.</li>
        <li><strong>Cambio de producto:</strong> Puedes elegir otro producto en perfecto estado.</li>
      </ul>

      <h2>Garantía de Satisfacción</h2>
      <p>Te invitamos a reflexionar si el producto no cumple con tus expectativas, ya que algunos productos requieren un periodo de adaptación.</p>

      <h2>Contáctanos</h2>
      <p>Si tienes dudas o necesitas ayuda, nuestro equipo está disponible para asistirte.</p>

      <p><strong>¡Gracias por elegirnos!</strong></p>
    </div>
  );
}

export default PoliticasReembolsos;
