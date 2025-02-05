import React, { useEffect, useState } from 'react';
import EmprendimientoList from './EmprendimientoList';
import EmprendimientoModal from './EmprendimientoModal';

function EmprendimientosApi() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    es_emp_nombre: '',
    es_emp_descripcion: '',
    es_emp_logo: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/emprendimientos')
      .then(response => response.json())
      .then(data => setEmprendimientos(data))
      .catch(error => console.error(error));
  }, []);

  const handleShowModal = (emprendimiento = null) => {
    if (emprendimiento) {
      setSelectedEmprendimiento(emprendimiento);
      setEditData(emprendimiento);
    } else {
      setSelectedEmprendimiento(null);
      setEditData({
        es_emp_nombre: '',
        es_emp_descripcion: '',
        es_emp_logo: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!editData.es_emp_nombre || !editData.es_emp_descripcion || !editData.es_emp_logo) {
      alert('Todos los campos son obligatorios');
      return;
    }

    fetch('http://localhost:3001/api/emprendimientos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(newEmprendimiento => {
        setEmprendimientos([...emprendimientos, newEmprendimiento]);
        setShowModal(false);
      })
      .catch(error => console.error('Error al crear el emprendimiento:', error));
  };

  const handleUpdate = () => {
    if (!selectedEmprendimiento || !selectedEmprendimiento.es_emp_id) {
      alert('El ID del emprendimiento es necesario');
      return;
    }

    if (!editData.es_emp_nombre || !editData.es_emp_descripcion || !editData.es_emp_logo) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    fetch(`http://localhost:3001/api/emprendimientos/${selectedEmprendimiento.es_emp_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(emprendimiento => {
        setEmprendimientos(emprendimientos.map(e => e.es_emp_id === emprendimiento.es_emp_id ? emprendimiento : e));
        setShowModal(false);
      })
      .catch(error => console.error('Error al actualizar el emprendimiento:', error));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este emprendimiento?")) {
      fetch(`http://localhost:3001/api/emprendimientos/${id}`, { method: 'DELETE' })
        .then(() => setEmprendimientos(emprendimientos.filter(emprendimiento => emprendimiento.es_emp_id !== id)))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Lista de Emprendimientos</h1>
      <button className="btn btn-success mb-3" onClick={() => handleShowModal()}>Nuevo Emprendimiento</button>
      <EmprendimientoList 
      emprendimientos={emprendimientos} 
      onShowModal={handleShowModal} // Aquí pasamos la función correctamente
      onDelete={handleDelete} 
        />
      {showModal && (
        <EmprendimientoModal
          show={showModal}
          handleClose={handleCloseModal}
          editData={editData}
          handleChange={handleChange}
          handleSave={selectedEmprendimiento ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
}

export default EmprendimientosApi;
