// src/components/SidebarAdvisor.js
import React from 'react';
import './Sidebar.css';

const SidebarAdvisor = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src='../assets/logo.png' alt="Logo" className="logo-img" />
            </div>
            <ul className="nav-links">
                <li><a href="/general-info">Información General</a></li>
                <li><a href="/account">Cuenta</a></li>
                <li><a href="/agenda">Agenda/Calendario</a></li>
                <li><a href="/interactive-board">Pizarrón Interactivo</a></li>
                <li><a href="/clients">Mis clientes</a></li>
                <li><a href="/online-support">Asistencia en línea</a></li>
                <li><a href="/logout">Cerrar Sesión</a></li>
            </ul>
        </div>
    );
}

export default SidebarAdvisor;
