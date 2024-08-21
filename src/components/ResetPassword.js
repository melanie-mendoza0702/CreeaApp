import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './ResetPassword.css';

const ResetPassword = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            // Enviar el código al backend para verificarlo
            const response = await fetch('/api/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode }),
            });

            const data = await response.json();

            if (response.ok) {
                // Aquí deberías enviar la nueva contraseña al backend para actualizarla
                setSuccessMessage('Tu contraseña ha sido restablecida exitosamente.');
                setTimeout(() => {
                    navigate('/login');  // Redirige al login después de un tiempo
                }, 2000);
            } else {
                setError(data.message || 'El código de verificación es incorrecto.');
            }
        } catch (err) {
            setError('Hubo un problema al verificar el código. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="reset-password-container">
                <div className="reset-password-box">
                    <h2>Restablecer Contraseña</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Código de Verificación</label>
                            <input
                                type="text"
                                name="verificationCode"
                                className="reset-password-input"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Nueva Contraseña</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="reset-password-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="error">{error}</div>}
                        {successMessage && <div className="success">{successMessage}</div>}
                        <button type="submit" className="reset-password-button">Restablecer Contraseña</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;
