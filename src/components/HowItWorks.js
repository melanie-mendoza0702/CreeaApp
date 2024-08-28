// src/components/HowItWorks.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const HowItWorks = () => {
    const { productName } = useParams();

    return (
        <div className="product-section">
            <Header />
            <div className="content-container">
                <h2>¿Cómo funciona {productName}?</h2>
                <p>"¿Cómo funciona?" para {productName}.</p>
            </div>
            <Footer />
        </div>
    );
};

export default HowItWorks;
