// src/components/SignUpAdvisor.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './SignUpAdvisor.css';

const SignUpAdvisor = () => {
    return (
        <div className="App">
            <Header />
            <div className="signup-container">
                <div className="signup-box">
                    <h2>Sign In</h2>
                    <form>
                        <input type="text" placeholder="Nombre completo" className="signup-input" />
                        <input type="email" placeholder="Correo terminación @gmail.com" className="signup-input" />
                        <input type="text" placeholder="Número de Identificación Personal" className="signup-input" />
                        <input type="password" placeholder="Contraseña" className="signup-input" />
                        <input type="password" placeholder="Confirmar contraseña" className="signup-input" />
                        <button type="submit" className="signup-button">Ingresar</button>
                    </form>
                    <a href="/login" className="login-link">¿Ya tienes una cuenta?</a>
                </div>
            <Footer />
            </div>
        </div>
    );
};

export default SignUpAdvisor;
