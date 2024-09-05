// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; 2024 CreeaApp. Todos los derechos reservados.</p>
                <p>
                    <a href="/terms">Términos y Condiciones</a> | <a href="/privacy">Política de Privacidad</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;

