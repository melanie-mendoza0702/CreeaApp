// src/components/GeneralInfo.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './GeneralInfo.css'; 

const GeneralInfo = () => {
    const navigate = useNavigate();

    const handleProductsClick = () => {
        navigate('/products');
    };

    return (
        <div className="App">
            <Header />
            <div className="general-info-container">
                <h2>Información General</h2>
                <button onClick={handleProductsClick}>Productos</button>
                <button>Nosotros</button>
                <button>Red de Asesores</button>
            </div>
            <Footer />
        </div>
    );
};

export default GeneralInfo;

