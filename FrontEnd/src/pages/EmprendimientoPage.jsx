import React, { useState } from 'react';
import EmprendimientosApi from '../components/EmprendimientoApi';
import EmprendimientoModal from '../components/EmprendimientoModal'; // Importa el modal

function EmprendimientoPage() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Función para mostrar el modal y pasar los datos del emprendimiento a editar
  const handleShowModal = (emprendimiento) => {
    setEditData(emprendimiento); // Guarda los datos del emprendimiento a editar
    setShowModal(true); // Muestra el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditData({}); // Limpia los datos de edición
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", editData);
    // Aquí puedes agregar la lógica para guardar los cambios en la API
    handleCloseModal(); // Cierra el modal después de guardar
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="cliente-page">
      <div className="cliente-page-content">
        {/* Pasa la función handleShowModal como prop onShowModal */}
        <EmprendimientosApi onShowModal={handleShowModal} />
      </div>

      {/* Modal para editar o crear un emprendimiento */}
      <EmprendimientoModal
        show={showModal}
        handleClose={handleCloseModal}
        editData={editData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EmprendimientoPage;