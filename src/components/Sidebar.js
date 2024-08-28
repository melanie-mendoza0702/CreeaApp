// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="menu">
                <li><a href="#informacion-general">Información General</a></li>
                <li><a href="#cuenta">Cuenta</a></li>
                <li><a href="#agenda-calendario">Agenda/Calendario</a></li>
                <li><a href="#pizarron-interactivo">Pizarrón Interactivo</a></li>
                <li><a href="#mis-seguros">Mis seguros</a></li>
                <li><a href="#mis-pagos">Mis pagos</a></li>
                <li><a href="#cerrar-sesion">Cerrar Sesión</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;

