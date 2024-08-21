import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                // Redirigir directamente a la página de restablecimiento de contraseña
                navigate('/reset-password', { state: { email } });
            } else {
                setError(data.message || 'Algo salió mal.');
            }
        } catch (err) {
            setError('Hubo un problema al enviar el correo electrónico. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="forgot-password-container">
                <div className="forgot-password-box">
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <p>Ingresa tu email y te enviaremos un link para reestablecerla</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email con terminación @gmail.com"
                            className="forgot-password-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="forgot-password-button">Enviar correo</button>
                    </form>
                    {successMessage && <div className="success">{successMessage}</div>}
                    <a href="/login" className="back-to-login">¿Acabas de recordarla? Volver al Log In</a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
