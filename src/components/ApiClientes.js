import React, { useEffect, useState } from 'react';

function ApiClientes() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch('http://localhost:3001/api/clientes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
                   <li key={cliente.es_cli_id}>
                   <strong>Nombre:</strong> {cliente.es_cli_nombre} {cliente.es_cli_apellido}<br />
                   <strong>Rol:</strong> {cliente.es_cli_perfil_rol}<br />
                   <strong>Correo:</strong> {cliente.es_cli_correo}<br />
                   <strong>Dirección:</strong> {cliente.es_cli_direccion}<br />
                   <strong>País:</strong> {cliente.es_cli_pais}<br />
                   <strong>Provincia:</strong> {cliente.es_cli_provincia}<br />
                   <strong>Ciudad:</strong> {cliente.es_cli_ciudad}<br />
                   <strong>Código Postal:</strong> {cliente.es_cli_codigo_postal}<br />
                   <strong>Teléfono 1:</strong> {cliente.es_cli_telefono_1}<br />
                   <strong>Teléfono 2:</strong> {cliente.es_cli_telefono_2}<br />
                   <strong>Fecha de Creación:</strong> {new Date(cliente.es_cli_fecha_creacion).toLocaleString()}<br />
                   <strong>Fecha de Modificación:</strong> {new Date(cliente.es_cli_fecha_modificacion).toLocaleString()}<br />
                   <strong>Estado:</strong> {cliente.es_cli_estado === 1 ? 'Activo' : 'Inactivo'}
                 </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiClientes;

