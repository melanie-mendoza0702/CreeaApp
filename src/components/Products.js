 // src/components/Products.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Products.css';

const Products = () => {
    const navigate = useNavigate();

    const handleProductClick = (productName) => {
        navigate(`/product-detail/${productName}`);
    };

    return (
        <div className="App">
            <Header />
            <div className="products">
                <h2>Productos</h2>
                <button onClick={() => handleProductClick('Imagina Ser')}>Imagina Ser</button>
                <button onClick={() => handleProductClick('Star Dotal')}>Star Dotal</button>
                <button onClick={() => handleProductClick('Orvi 99')}>Orvi 99</button>
                <button onClick={() => handleProductClick('Vida Mujer')}>Vida Mujer</button>
                <button onClick={() => handleProductClick('SeguBeca')}>SeguBeca</button>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
