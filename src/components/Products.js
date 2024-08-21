import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Products.css'; 

const Products = () => {
    return (
        <div className="App">
            <Header />
            <div className="products-container">
                <h2>Productos</h2>
                <button>Imagina Ser</button>
                <button>Star Dotal</button>
                <button>Orvi 99</button>
                <button>Vida Mujer</button>
                <button>SeguBeca</button>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
