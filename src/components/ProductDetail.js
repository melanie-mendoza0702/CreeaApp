// src/components/ProductDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productName } = useParams();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="product-detail">
            <Header />
            <div className="product-detail-container">
                <h2>{productName}</h2>
                <button onClick={() => handleNavigation(`/product/${productName}/what-is`)}>¿Qué es?</button>
                <button onClick={() => handleNavigation(`/product/${productName}/how-it-works`)}>¿Cómo funciona?</button>
                <button onClick={() => handleNavigation(`/product/${productName}/general-conditions`)}>Condiciones Generales</button>
                <button onClick={() => handleNavigation(`/product/${productName}/faq`)}>Preguntas frecuentes</button>
                <button onClick={() => handleNavigation(`/product/${productName}/documents`)}>Documentos</button>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
