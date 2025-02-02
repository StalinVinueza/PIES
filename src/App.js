import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import FooterEco from './components/FooterEco';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Contacto from './pages/Contacto';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavMenu /> 
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/clientes" element={<Clientes />} /> 
          <Route path="/contacto" element={<Contacto />} /> 
        </Routes>
      </main>
      <FooterEco />
    </div>
  );
}

export default App;



