// src/components/LogIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('cliente'); // Valor por defecto
    const navigate = useNavigate();

    const handleLogin = () => {
        // Aquí iría la lógica de autenticación real
        if (username && password) {
            // Dependiendo del tipo de usuario, redirigir a la página correspondiente
            if (userType === 'cliente') {
                navigate('/client-home');
            } else if (userType === 'asesor') {
                navigate('/advisor-home');
            } else if (userType === 'promotor') {
                navigate('/promoter-home');
            }
        } else {
            alert('Por favor, ingrese su usuario y contraseña.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Log In</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    className="login-select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="cliente">Cliente</option>
                    <option value="asesor">Asesor</option>
                    <option value="promotor">Promotor</option>
                </select>
                <button className="login-button" onClick={handleLogin}>
                    Ingresar
                </button>
                <a href="/forgot-password" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>
            <a href="/register" className="register-link">
                ¿No tienes cuenta? Regístrate
            </a>
        </div>
    );
};

export default LogIn;
