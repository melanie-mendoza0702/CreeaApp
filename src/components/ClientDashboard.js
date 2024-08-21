import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './ClientDashboard.css';  

const ClientDashboard = () => {
    const navigate = useNavigate();

    const handleInfoClick = () => {
        navigate('/general-info');
    };

    return (
        <div className="App">
            <Header />
            <div className="client-dashboard">
                <h2>Bienvenid@ a CREEA web</h2>
                <button onClick={handleInfoClick}>Información General</button>
                <button>Acerca de nosotros</button>
                <button>Tipo de cambio</button>
                <button>Quiero agendar una cita</button>
                <button>Mi cuenta</button>
                <button>Cerrar Sesión</button>
            </div>
            <Footer />
        </div>
    );
};

export default ClientDashboard;
