import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar íconos de Font Awesome
import { Link } from "react-router-dom";  // Importar Link para redirección


function RegistroUsuario() {
  const [formData, setFormData] = useState({
    ES_CLI_NOMBRE: '',
    ES_CLI_APELLIDO: '',
    ES_CLI_CORREO: '',
    contrasena: '',
    confirmContrasena: '', // Nuevo campo para confirmar la contraseña
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

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de contraseña

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar que las contraseñas coincidan
    if (formData.contrasena !== formData.confirmContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

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
      <h2 >Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        
      <div className="row">
    <div className="col-md-12 col-lg-12">
      
      <label className="form-label text-start w-100">Nombre</label>
      <input type="text" name="ES_CLI_NOMBRE" placeholder="Ingrese su Nombre" className="form-control form-control-sm no_caracteres" onChange={handleChange} required maxLength="30" />
      
      <label className="form-label text-start w-100">Apellido</label>
      <input type="text" name="ES_CLI_APELLIDO" placeholder="Ingrese su Apellido" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Correo</label>
      <input type="email" name="ES_CLI_CORREO" placeholder="Ingrese un Correo" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-50">Contraseña</label>
      <div className="input-group">
        <input 
          type={showPassword ? 'text' : 'password'} 
          name="contrasena" 
          placeholder="Ingrese unaContraseña" 
          className="form-control" 
          onChange={handleChange} 
          required 
        />
        <div className="input-group-append">
          <button 
            type="button" 
            className="btn btn-light" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="input-group">
        <input 
          type={showConfirmPassword ? 'text' : 'password'} 
          name="confirmContrasena" 
          placeholder="Confirme su Contraseña" 
          className="form-control" 
          onChange={handleChange} 
          required 
        />
        <div className="input-group-append">
          <button 
            type="button" 
            className="btn btn-light" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <label className="form-label text-start w-100">Género</label>
      <select name="ES_CLI_GENERO" className="form-control" onChange={handleChange} required>
        <option value="">Seleccione su Género</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        
      </select>

      <label className="form-label text-start w-100">Fecha de Nacimiento</label>
      <input type="date" name="ES_CLI_FECHA_NACIMIENTO" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Dirección</label>
      <input type="text" name="ES_CLI_DIRECCION" placeholder="Ingrese su Dirección" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">País</label>
      <input type="text" name="ES_CLI_PAIS" placeholder="Ingrese su País" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Provincia</label>
      <input type="text" name="ES_CLI_PROVINCIA" placeholder="Ingrese su Provincia" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Ciudad</label>
      <input type="text" name="ES_CLI_CIUDAD" placeholder="Ingrese su Ciudad" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Código Postal</label>
      <input type="text" name="ES_CLI_CODIGO_POSTAL" placeholder="Ingrese su Código Postal" className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Teléfono</label>
      <input type="text" name="ES_CLI_TELEFONO_1" placeholder="Ingrese un Número Teléfonico " className="form-control" onChange={handleChange} required />

      <label className="form-label text-start w-100">Teléfono 2 (Opcional)</label>
      <input type="text" name="ES_CLI_TELEFONO_2" placeholder="Ingrese un Número Teléfonico(Opcional)" className="form-control" onChange={handleChange} />

    </div>
  </div>
        {/* Botón de envío con color verde */}
        <button type="submit" className="btn btn-success w-100">Registrarse</button>
      </form>
      <div className="signup-link">
        <p>Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
      </div>
    </div>
  );
}

export default RegistroUsuario;
