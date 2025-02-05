import React, { useEffect, useState } from "react";
import axios from "axios";
import EmprendimientoList from "./EmprendimientoList";
import EmprendimientoModal from "./EmprendimientoModal";
import EmprendimientoForm from "./EmprendimientoForm";

function EmprendimientosApi() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    es_emp_id: "",
    es_emp_nombre: "",
    es_emp_descripcion: "",
    es_emp_logo: null
  });

  // Cargar emprendimientos al montar el componente
  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/emprendimientos");
        setEmprendimientos(response.data);
      } catch (error) {
        console.error("Error al obtener los emprendimientos:", error);
        setEmprendimientos([]); // Evitar error al mapear en caso de fallo
      }
    };

    fetchEmprendimientos();
  }, []);

  // Mostrar modal para nuevo o editar emprendimiento
  const handleShowModal = (emprendimiento = {}) => {
    setEditData({
      es_emp_id: emprendimiento.es_emp_id || "",
      es_emp_nombre: emprendimiento.es_emp_nombre || "",
      es_emp_descripcion: emprendimiento.es_emp_descripcion || "",
      es_emp_logo: emprendimiento.es_emp_logo || null
    });

    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => setShowModal(false);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    if (e.target.name === "es_emp_logo") {
      if (e.target.files && e.target.files[0]) {
        setEditData((prev) => ({
          ...prev,
          es_emp_logo: e.target.files[0]
        }));
      }
    } else {
      setEditData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  // Guardar o actualizar emprendimiento
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("es_emp_nombre", editData.es_emp_nombre);
    formData.append("es_emp_descripcion", editData.es_emp_descripcion);
    if (editData.es_emp_logo instanceof File) {
      formData.append("es_emp_logo", editData.es_emp_logo);
    }

    try {
      let response;
      if (editData.es_emp_id) {
        response = await axios.put(
          `http://localhost:3001/api/emprendimientos/${editData.es_emp_id}`,
          formData
        );
      } else {
        response = await axios.post("http://localhost:3001/api/emprendimientos", formData);
      }

      console.log("Respuesta del servidor:", response.data);
      setShowModal(false);
      window.location.reload(); // ✅ Recargar la página después de guardar
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Lista de Emprendimientos</h1>
      <button className="btn btn-success mb-3" onClick={() => handleShowModal()}>
        Nuevo Emprendimiento
      </button>

      <EmprendimientoList emprendimientos={emprendimientos} onShowModal={handleShowModal} />

      {showModal && (
        <EmprendimientoModal
          show={showModal}
          handleClose={handleCloseModal}
          editData={editData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        >
          <EmprendimientoForm editData={editData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </EmprendimientoModal>
      )}
    </div>
  );
}

export default EmprendimientosApi;
