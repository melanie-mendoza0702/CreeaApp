import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('cliente'); // Valor por defecto
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await fetch('/api/login', {  // Aquí solo usa la ruta relativa
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, userType }),
                });
    
                const data = await response.json();
    
                if (data.success) {
                    // Dependiendo del tipo de usuario, redirigir a la página correspondiente
                    if (userType === 'cliente') {
                        navigate('/client-home');
                    } else if (userType === 'asesor') {
                        navigate('/advisor-home');
                    } else if (userType === 'promotor') {
                        navigate('/promoter-home');
                    }
                } else {
                    alert(data.message); // Mostrar el mensaje de error
                }
            } catch (error) {
                console.error('Error en la autenticación:', error);
                alert('Error de conexión con el servidor');
            }
        } else {
            alert('Por favor, ingrese su usuario y contraseña.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/user-type-selection');
    };

    return (
        <div className="App">
            <Header />
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
                        <option value="promotor/administrador">Promotor</option>
                    </select>
                    <button className="login-button" onClick={handleLogin}>
                        Ingresar
                    </button>
                    <a href="/forgot-password" className="forgot-password">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <span
                    className="user-type-selection"
                    onClick={handleRegisterClick}
                    style={{ color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    ¿No tienes cuenta? Regístrate
                </span>
            </div>
            <Footer />
        </div>
    );
};

export default LogIn;
