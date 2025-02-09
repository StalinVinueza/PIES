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
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <input type="text" name="ES_CLI_NOMBRE" placeholder="Nombre" className="form-control" onChange={handleChange} required />
            <input type="text" name="ES_CLI_APELLIDO" placeholder="Apellido" className="form-control" onChange={handleChange} required />
            <input type="email" name="ES_CLI_CORREO" placeholder="Correo" className="form-control" onChange={handleChange} required />
            
            {/* Campo para la contraseña */}
            <div className="input-group">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="contrasena" 
                placeholder="Contraseña" 
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
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Mostrar/ocultar icono de ojo */}
                </button>
              </div>
            </div>

            {/* Campo para confirmar la contraseña */}
            <div className="input-group">
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                name="confirmContrasena" 
                placeholder="Confirmar Contraseña" 
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
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Mostrar/ocultar icono de ojo */}
                </button>
              </div>
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error */}

            <select name="ES_CLI_GENERO" className="form-control" onChange={handleChange} required>
              <option value="">Selecciona tú Género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option> {/* Corregido para "Otro" */}
            </select>
            
            {/* Campo de fecha de nacimiento */}
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
        <button type="submit" className="btn btn-success w-100">Registrarse</button>
      </form>
      <div className="signup-link">
        <p>Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
      </div>
    </div>
  );
}

export default RegistroUsuario;
