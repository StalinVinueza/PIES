import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Register.css';

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    ES_CLI_NOMBRE: '',
    ES_CLI_APELLIDO: '',
    ES_CLI_CORREO: '',
    contrasena: '',
    ES_CLI_GENERO: '',
    ES_CLI_FECHA_NACIMIENTO: '',
    ES_CLI_DIRECCION: '',
    ES_CLI_PAIS: '',
    ES_CLI_PROVINCIA: '',
    ES_CLI_CIUDAD: '',
    ES_CLI_CODIGO_POSTAL: '',
    ES_CLI_TELEFONO_1: '',
    ES_CLI_TELEFONO_2: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/registro', formData);
      // alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      // alert('Error al registrar usuario');
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <input type="text" name="ES_CLI_NOMBRE" placeholder="Nombre" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_APELLIDO" placeholder="Apellido" className="form-control" onChange={handleChange} required />
            <input type="email" name="ES_CLI_CORREO" placeholder="Correo" className="form-control" onChange={handleChange} required />
            <input type="password" name="contrasena" placeholder="Contraseña" className="form-control" onChange={handleChange} required />
            <select name="ES_CLI_GENERO" className="form-control" onChange={handleChange} required>
              <option value="">Seleccione Género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <input type="date" name="ES_CLI_FECHA_NACIMIENTO" className="form-control" onChange={handleChange} required />
        
            <input type="text" name="ES_CLI_DIRECCION" placeholder="Dirección" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_PAIS" placeholder="País" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_PROVINCIA" placeholder="Provincia" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_CIUDAD" placeholder="Ciudad" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_CODIGO_POSTAL" placeholder="Código Postal" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_TELEFONO_1" placeholder="Teléfono 1" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_TELEFONO_2" placeholder="Teléfono 2 (Opcional)" className="form-control" onChange={handleChange} />
          </div>
        </div>
        {/* Botón de envío con color verde */}
        <button type="submit" className="btn btn-success w-100">Registrar</button>
      </form>
    </div>
  );
}

export default RegistroUsuario;
