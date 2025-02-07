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

export default ClientePage;
