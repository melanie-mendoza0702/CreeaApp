// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';  // Asegúrate de que la ruta sea correcta

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo">
                <img src={logo} alt="CreeaApp Logo" className="logo-img" />
                <h1>CreeaApp</h1>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/about">Acerca de</a></li>
                    <li><a href="/contact">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
