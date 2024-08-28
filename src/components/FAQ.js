// src/components/FAQ.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const FAQ = () => {
    const { productName } = useParams();

    return (
        <div className="product-section">
            <Header />
            <div className="content-container">
                <h2>Preguntas Frecuentes de {productName}</h2>
                <p>"Preguntas Frecuentes" para {productName}.</p>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
