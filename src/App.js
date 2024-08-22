// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserTypeSelection from './components/UserTypeSelection';
import LogIn from './components/LogIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyCode from './components/VerifyCode';
import SignUpAdvisor from './components/SignUpAdvisor';
import SignUpClient from './components/SignUpClient';
import Sidebar from './components/Sidebar';
import ClientHome from './components/ClientDashboard';
import GeneralInfo from './components/GeneralInfo';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import WhatIs from './components/WhatIs';
import HowItWorks from './components/HowItWorks';
import GeneralConditions from './components/GeneralConditions';
import FAQ from './components/FAQ';
import Documents from './components/Documents';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-type-selection" element={<UserTypeSelection />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup-advisor" element={<SignUpAdvisor />} />
          <Route path="/signup-client" element={<SignUpClient />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/client-home" element={<ClientHome />} />
          <Route path="/general-info" element={<GeneralInfo />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-detail/:productName" element={<ProductDetail />} />
          <Route path="/product/:productName/what-is" element={<WhatIs />} />
          <Route path="/product/:productName/how-it-works" element={<HowItWorks />} />
          <Route path="/product/:productName/general-conditions" element={<GeneralConditions />} />
          <Route path="/product/:productName/faq" element={<FAQ />} />
          <Route path="/product/:productName/documents" element={<Documents />} />

          {/* Rutas que incluyen el Sidebar */}
          <Route 
            path="/dashboard/*" 
            element={
              <div className="dashboard-container">
                <Sidebar />
                <div className="content">
                  {/* Aquí puedes definir subrutas específicas del dashboard */}
                  <Routes>
                    {/* Ejemplo de subrutas */}
                    <Route path="informacion-general" element={<div>Información General</div>} />
                    <Route path="cuenta" element={<div>Cuenta</div>} />
                    <Route path="agenda-calendario" element={<div>Agenda/Calendario</div>} />
                    <Route path="pizarron-interactivo" element={<div>Pizarrón Interactivo</div>} />
                    <Route path="mis-seguros" element={<div>Mis Seguros</div>} />
                    <Route path="mis-pagos" element={<div>Mis Pagos</div>} />
                  </Routes>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
