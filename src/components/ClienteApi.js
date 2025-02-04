import React, { useEffect, useState } from 'react';
import ClienteList from './ClienteList';
import ClienteModal from './ClienteModal';

function ApiClientes() {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error(error));
  }, []);

  const handleShowModal = (cliente = null) => {
    if (cliente) {
      // Si se pasa un cliente (para editar), cargamos sus datos
      setSelectedCliente(cliente);
      setEditData(cliente);
    } else {
      // Si no se pasa un cliente (nuevo cliente), iniciamos el formulario vacío
      setSelectedCliente(null);
      setEditData({
        es_cli_nombre: '',
        es_cli_apellido: '',
        es_cli_correo: '',
        es_cli_direccion: '',
        es_cli_telefono_1: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const method = selectedCliente ? 'PUT' : 'POST';
    const url = selectedCliente
      ? `http://localhost:3001/api/clientes/${selectedCliente.es_cli_id}`
      : 'http://localhost:3001/api/clientes';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(cliente => {
        if (selectedCliente) {
          setClientes(clientes.map(c => (c.es_cli_id === cliente.es_cli_id ? cliente : c)));
        } else {
          setClientes([...clientes, cliente]);
        }
        setShowModal(false);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/clientes/${id}`, { method: 'DELETE' })
      .then(() => setClientes(clientes.filter(cliente => cliente.es_cli_id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Lista de Clientes</h1>
      <button className="btn btn-success mb-3" onClick={() => handleShowModal()}>Nuevo Cliente</button>
      <ClienteList clientes={clientes} onShowModal={handleShowModal} onDelete={handleDelete} />
      {showModal && (
        <ClienteModal
          show={showModal}
          handleClose={handleCloseModal}
          editData={editData}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default ApiClientes;

