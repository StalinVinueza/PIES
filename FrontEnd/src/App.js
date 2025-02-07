import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import FooterEco from './components/FooterEco';
import Home from './pages/Home';
import Clientes from './pages/ClientePage';
import Emprendimientos from './pages/EmprendimientoPage';
import Productos from './pages/ProductoPage';
import Cart from './components/Carrito';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <NavMenu /> 

      {/* Contenido principal */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} /> 
          <Route path="/productos" element={<Productos />} />
          <Route path="/emprendimientos" element={<ProtectedRoute><Emprendimientos /></ProtectedRoute>} />
          <Route path="/carrito" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/contacto" element={<Contacto />} /> 
          <Route path="/nosotros" element={<Nosotros />} /> 
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>

      {/* Footer */}
      <FooterEco />
    </div>
  );
}

export default App;
