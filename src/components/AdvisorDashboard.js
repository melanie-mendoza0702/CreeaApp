import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvisorDashboard.css';
import Header from './Header';
import Footer from './Footer';

const PromoterDashboard = () => {
    const navigate = useNavigate(); // Hook para la navegación

    const products = [
        { name: 'Imagina Ser', description: 'Un seguro para el futuro.' },
        { name: 'Star Dotal', description: 'Protección y ahorro en uno.' },
        { name: 'Orvi 99', description: 'Seguro de vida flexible.' },
        { name: 'Vida Mujer', description: 'Protección especial para mujeres.' },
        { name: 'Segubeca', description: 'Asegura la educación de tus hijos.' }
    ];

    const [isDropdownOpen, setDropdownOpen] = useState({});

    const toggleDropdown = (index) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className="promoter-dashboard-container">
            <Header />
            <div className="promoter-dashboard-content">
                
                <div className="quick-access">
                    <div className="access-item pizarra" onClick={() => navigate('/pizarra')}>
                        <h3>Pizarra Interactiva</h3>
                        <p>Accede a tu pizarra</p>
                    </div>
                    <div className="access-item cuenta">
                        <h3>Cuenta del Asesor</h3>
                        <p>Gestiona tu cuenta</p>
                    </div>
                    <div className="access-item lista-clientes">
                        <h3>Lista de Clientes</h3>
                        <p>Consulta tu lista de clientes</p>
                    </div>
                    <div className="access-item agenda">
                        <h3>Agenda del Asesor</h3>
                        <p>Revisa tus próximas citas</p>
                    </div>
                    <div className="access-item asistencia">
                        <h3>Asistencia en Línea</h3>
                        <p>Chatbot de asistencia</p>
                    </div>
                    <div className="access-item tipo-cambio">
                        <h3>Tipo de Cambio</h3>
                        <p>Consulta el tipo de cambio actual</p>
                    </div>
                    <div className="access-item agendar-cita">
                        <h3>Agendar Cita</h3>
                        <p>Crea una sala de reuniones</p>
                    </div>
                </div>

                <div className="info-box">
                    <h2>Información General</h2>
                    <p>Resumen del asesor</p>
                </div>

                <div className="products-section">
                    <h2>Productos</h2>
                    <div className="products-grid">
                        {products.map((product, index) => (
                            <div className="product-item" key={index} onClick={() => toggleDropdown(index)}>
                                <img src={`../assets/${product.icon}`} alt={`${product.name} icon`} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                {isDropdownOpen[index] && (
                                    <ul>
                                        <li>¿Qué es?</li>
                                        <li>¿Cómo funciona?</li>
                                        <li>Condiciones Generales</li>
                                        <li>Preguntas Frecuentes</li>
                                        <li>Documentos</li>
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PromoterDashboard;
