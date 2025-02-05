import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import FooterEco from './components/FooterEco';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros'; // ✅ Importamos Nosotros
import './App.css';


function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <NavMenu /> 

      {/* Contenido principal */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/clientes" element={<Clientes />} /> 
          <Route path="/contacto" element={<Contacto />} /> 
          <Route path="/nosotros" element={<Nosotros />} /> {/* ✅ Agregamos Nosotros */}
        </Routes>
      </main>

      {/* Footer */}
      <FooterEco />
    </div>
  );
}

export default App;
