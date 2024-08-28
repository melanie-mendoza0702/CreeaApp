// src/components/UserTypeSelection.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './UserTypeSelection.css';

const UserTypeSelection = () => {
    const navigate = useNavigate();

    const handleClientClick = () => {
        navigate('/signup-client');
    };

    const handleAdvisorClick = () => {
        navigate('/signup-advisor');
    };

    const handlePromoterClick = () => {
        navigate('/signup-promoter');
    };

    return (
        <div className="App">
            <Header />
            <div className="user-type-container">
                <div className="user-type-box">
                    <h2>¿Qué tipo de cuenta quieres crear?</h2>
                    <div className="cta-buttons">
                        <button className="user-button" onClick={handleClientClick}>Soy Cliente</button>
                        <button className="user-button" onClick={handleAdvisorClick}>Soy Asesor</button>
                        <button className="user-button" onClick={handlePromoterClick}>Soy Promotor</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserTypeSelection;
