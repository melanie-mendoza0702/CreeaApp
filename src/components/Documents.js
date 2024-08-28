// src/components/Documents.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Documents = () => {
    const { productName } = useParams();

    return (
        <div className="product-section">
            <Header />
            <div className="content-container">
                <h2>Documentos de {productName}</h2>
                <p>"Documentos" para {productName}.</p>
            </div>
            <Footer />
        </div>
    );
};

export default Documents;
