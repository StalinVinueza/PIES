import React, { useEffect, useState } from 'react';
import ClienteList from './ClienteList';
import ClienteModal from './ClienteModal';
import ClienteDeleteModal from './EliminacionModal'; // Importar el nuevo modal


function ApiClientes() {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [editData, setEditData] = useState({
    es_cli_nombre: '',
    es_cli_apellido: '',
    es_cli_correo: '',
    es_cli_mongo: '', // Agregar campo de contraseña
    es_cli_direccion: '',
    es_cli_telefono_1: '',
    es_cli_genero: '',
    es_cli_fecha_nacimiento: '',
    es_cli_pais: '',
    es_cli_provincia: '',
    es_cli_ciudad: '',
    es_cli_codigo_postal: '',
    es_cli_telefono_2: '',
    es_cli_estado: ''
  });
  const [clienteToDelete, setClienteToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error(error));
  }, []);

  const handleShowModal = (cliente = null) => {
    if (cliente) {
      setSelectedCliente(cliente);
      setEditData(cliente);
    } else {
      setSelectedCliente(null);
      setEditData({
        es_cli_nombre: '',
        es_cli_apellido: '',
        es_cli_correo: '',
        es_cli_mongo: '',
        es_cli_direccion: '',
        es_cli_telefono_1: '',
        es_cli_genero: '',
        es_cli_fecha_nacimiento: '',
        es_cli_pais: '',
        es_cli_provincia: '',
        es_cli_ciudad: '',
        es_cli_codigo_postal: '',
        es_cli_telefono_2: '',
        es_cli_estado: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!editData.es_cli_nombre || !editData.es_cli_apellido || !editData.es_cli_correo || !editData.es_cli_mongo) {
      alert('Todos los campos obligatorios deben ser completados');
      return;
    }

    fetch('http://localhost:3001/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(newCliente => {
        setClientes([...clientes, newCliente]);
        setShowModal(false);
      })
      .catch(error => console.error('Error al crear el cliente:', error));
  };

  const handleUpdate = () => {
    if (!selectedCliente || !selectedCliente.es_cli_id) {
      alert('El ID del cliente es necesario');
      return;
    }

    if (!editData.es_cli_nombre || !editData.es_cli_apellido || !editData.es_cli_correo) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    fetch(`http://localhost:3001/api/clientes/${selectedCliente.es_cli_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(cliente => {
        setClientes(clientes.map(c => (c.es_cli_id === cliente.es_cli_id ? cliente : c)));
        setShowModal(false);
      })
      .catch(error => console.error('Error al actualizar el cliente:', error));
  };

  const handleShowDeleteModal = (id) => {
    setClienteToDelete(id);
    setShowDeleteModal(true); // Mostrar el modal de confirmación de eliminación
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/clientes/${id}`, { method: 'DELETE' })
      .then(() => setClientes(clientes.filter(cliente => cliente.es_cli_id !== id)))
      .catch(error => console.error(error));
    setShowDeleteModal(false);
    setClienteToDelete(null); // Limpiar el cliente seleccionado
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Lista de Clientes</h1>
      
      <ClienteList clientes={clientes} onShowModal={handleShowModal} onDelete={handleShowDeleteModal} />
      
      {showModal && (
        <ClienteModal
          show={showModal}
          handleClose={handleCloseModal}
          editData={editData}
          handleChange={handleChange}
          handleSave={selectedCliente ? handleUpdate : handleCreate}
        />
      )}

      {/* Usar el nuevo modal de eliminación */}
      <ClienteDeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        clienteToDelete={clienteToDelete}
      />
    </div>
  );
}

export default ApiClientes;
