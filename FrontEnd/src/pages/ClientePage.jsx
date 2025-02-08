import React from 'react';
import ApiClientes from '../components/ClienteApi';
import '../styles/ClientePages.css';

function ClientePage() {
  return (
    <div className="cliente-page">
      <div className="cliente-content">
        <ApiClientes />
      </div>
    </div>
  );
}

export default ClientePage;
