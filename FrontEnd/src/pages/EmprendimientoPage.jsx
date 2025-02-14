import React, { useState, useEffect } from "react";
import EmprendimientosApi from '../components/EmprendimientoApi';
import EmprendimientoModal from '../components/EmprendimientoModal';

const EmprendimientoPage = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [editData, setEditData] = useState({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: null });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmprendimientos();
  }, []);

  const fetchEmprendimientos = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/emprendimientos");
      const data = await res.json();
      setEmprendimientos(data);
    } catch (error) {
      console.error("Error al obtener los emprendimientos:", error);
    }
  };

  const handleShowModal = (emprendimiento) => {
    if (emprendimiento) {
      setEditData({
        es_emp_id: emprendimiento.es_emp_id,
        es_emp_nombre: emprendimiento.es_emp_nombre,
        es_emp_descripcion: emprendimiento.es_emp_descripcion,
        es_emp_logo: emprendimiento.es_emp_logo,
      });
    } else {
      setEditData({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: null });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: null });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("es_emp_nombre", editData.es_emp_nombre);
    formData.append("es_emp_descripcion", editData.es_emp_descripcion);
    if (editData.es_emp_logo instanceof File) {
      formData.append("es_emp_logo", editData.es_emp_logo);
    }

    try {
      const url = editData.es_emp_id
        ? `http://localhost:3001/api/emprendimientos/${editData.es_emp_id}`
        : "http://localhost:3001/api/emprendimientos";
      const method = editData.es_emp_id ? "PUT" : "POST";

      await fetch(url, {
        method: method,
        body: formData,
      });

      setShowModal(false);
      setEditData({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: null });
      fetchEmprendimientos(); // Recarga la lista de emprendimientos
    } catch (error) {
      console.error("Error al agregar/editar el emprendimiento:", error);
    }
  };

  return (
    <div className="cliente-page-content">
      <EmprendimientosApi onShowModal={handleShowModal} />

      <EmprendimientoModal
        show={showModal}
        handleClose={handleCloseModal}
        editData={editData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EmprendimientoPage;