import React, { useState, useEffect } from "react";

const EmprendimientoPage = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [editData, setEditData] = useState({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: null });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/emprendimientos")
      .then((res) => res.json())
      .then((data) => setEmprendimientos(data));
  }, []);

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

    await fetch("http://localhost:3001/api/emprendimientos", {
      method: "POST",
      body: formData,
    });

    setShowModal(false);
    setEditData({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: null });
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Emprendimientos</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Emprendimiento
      </button>
      {showModal && (
        <form onSubmit={handleSubmit} className="mb-3">
          <input type="text" name="es_emp_nombre" placeholder="Nombre" value={editData.es_emp_nombre} onChange={handleChange} required className="form-control mb-2" />
          <input type="text" name="es_emp_descripcion" placeholder="Descripción" value={editData.es_emp_descripcion} onChange={handleChange} required className="form-control mb-2" />
          <input type="file" name="es_emp_logo" onChange={handleChange} className="form-control mb-2" />
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
        </form>
      )}
      <div className="row">
        {emprendimientos.map((emp) => (
          <div className="col-md-4 mb-3" key={emp.id}>
            <div className="card">
              {emp.es_emp_logo && <img src={`http://localhost:3001${emp.es_emp_logo}`} alt={emp.es_emp_nombre} className="card-img-top" />}
              <div className="card-body">
                <h5 className="card-title">{emp.es_emp_nombre}</h5>
                <p className="card-text">{emp.es_emp_descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmprendimientoPage;
