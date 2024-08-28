// src/components/GeneralConditions.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const GeneralConditions = () => {
    const { productName } = useParams();

    return (
        <div className="product-section">
            <Header />
            <div className="content-container">
                <h2>Condiciones Generales de {productName}</h2>
                <p>"Condiciones Generales" para {productName}.</p>
            </div>
            <Footer />
        </div>
    );
};

export default GeneralConditions;
