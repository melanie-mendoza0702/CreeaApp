// src/components/HomePage.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/user-type-selection');
    };

    return (
        <div className="App">
            <Header />
            <main className="home-page">
                <h2>Bienvenido a CreeaApp</h2>
                <p>La solución perfecta para gestionar el proceso de venta de seguros de manera eficiente.</p>
                <div className="cta-buttons">
                    <button onClick={handleLoginClick}>Iniciar Sesión</button>
                    <button className="secondary" onClick={handleRegisterClick}>Registrarse</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
