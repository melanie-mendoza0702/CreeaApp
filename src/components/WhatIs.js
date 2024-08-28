// src/components/WhatIs.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const WhatIs = () => {
    const { productName } = useParams();

    return (
        <div className="product-section">
            <Header />
            <div className="content-container">
                <h2>¿Qué es {productName}?</h2>
                <p>"¿Qué es?" para {productName}.</p>
            </div>
            <Footer />
        </div>
    );
};

export default WhatIs;
