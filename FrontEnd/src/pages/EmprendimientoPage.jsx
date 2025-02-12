import React from 'react';
import EmprendimientosApi from '../components/EmprendimientoApi';

function ClientePage() {
  return (
    <div className="cliente-page">
      <div className="cliente-page-content">
        <EmprendimientosApi />
      </div>
    </div>
  );
}


const usuario = JSON.parse(localStorage.getItem("usuario"));
console.log(usuario); // Imprime el objeto usuario en la consola
export default ClientePage;
